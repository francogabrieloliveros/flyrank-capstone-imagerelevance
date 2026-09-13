import type { Post } from "@/models/post.model";
import { pool } from "@/db/client";
import { embedText } from "@/ai/embed";
import { cosineSimilarity } from "@/ai/cosine-similarity";

export const addPost = async (post: Post): Promise<Post> => {
  const { title, body, expectedCategory } = post;

  const result = await pool.query(
    `
    INSERT INTO posts (title, body, expected_category)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [title, body, expectedCategory ?? null],
  );

  return result.rows[0];
};

export const embedPost = async (post: Post): Promise<Post> => {
  const { id } = post;
  const vector = await embedText(`${post.title}. ${post.body}`);

  const result = await pool.query(
    `
     INSERT INTO post_vectors (post_id, vector)
     VALUES ($1, $2)
     ON CONFLICT (post_id) DO UPDATE SET vector = ($2)
     RETURNING *
     `,
    [id, vector],
  );

  return result.rows[0];
};

export interface RankedImage {
  imageId: number;
  subject: string;
  category: string;
  confidence: number;
  flagged: boolean;
  similarity: number;
}

export const rankImagesForPost = async (
  postId: number,
): Promise<RankedImage[]> => {
  const {
    rows: [post],
  } = await pool.query("SELECT vector FROM post_vectors WHERE post_id = $1", [
    postId,
  ]);

  if (!post) return [];

  const { rows: images } = await pool.query(`
      SELECT iv.image_id, iv.vector, im.subject, im.category, im.confidence, im.flagged
      FROM image_vectors iv
      JOIN image_metadata im ON im.image_id = iv.image_id
    `);

  const rankedImages = images
    .map((image): RankedImage => ({
      imageId: image.image_id,
      subject: image.subject,
      category: image.category,
      confidence: image.confidence,
      flagged: image.flagged,
      similarity: cosineSimilarity(
        post.vector as number[],
        image.vector as number[],
      ),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  return rankedImages.slice(0, 5);
};
