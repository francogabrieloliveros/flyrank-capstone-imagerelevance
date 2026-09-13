import type { Post } from "@/models/post.model";
import { pool } from "@/db/client";
import { embedText } from "@/ai/embed";
import { cosineSimilarity } from "@/ai/cosine-similarity";
import { mismatchGuard } from "@/ai/mismatch-guard";
import { type GuardOutput } from "@/ai/mismatch-guard";

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
): Promise<{
  suggestion?:
    | ({
        suggestion_id: number;
        subject?: never;
        category?: never;
      } & GuardOutput)
    | ({
        suggestion_id: number;
        subject: string;
        category: string;
      } & GuardOutput);
  ranked_images?: RankedImage[];
}> => {
  const {
    rows: [post],
  } = await pool.query("SELECT vector FROM post_vectors WHERE post_id = $1", [
    postId,
  ]);

  if (!post) return {};

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
  const topMatch = rankedImages[0];

  const {
    rows: [postData],
  } = await pool.query(
    "SELECT id, expected_category FROM posts WHERE id = $1",
    [postId],
  );
  if (!postData) return {};

  const guardResult = mismatchGuard({
    postExpectedCategory: postData.expected_category,
    imageCategory: topMatch!.category,
    imageConfidence: topMatch!.confidence,
    imageFlagged: topMatch!.flagged,
    similarity: topMatch!.similarity,
  });

  const {
    rows: [suggestion],
  } = await pool.query(
    `
      INSERT INTO suggestions (post_id, image_id, similarity, guard_result, reason,
      status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `,
    [
      postData.id,
      topMatch?.imageId,
      topMatch?.similarity,
      guardResult.result,
      guardResult.reason,
    ],
  );

  if (guardResult.result === "no_match" || guardResult.result === "rejected") {
    return {
      suggestion: { suggestion_id: suggestion.id, ...guardResult },
      ranked_images: rankedImages.slice(0, 5),
    };
  }
  return {
    suggestion: {
      suggestion_id: suggestion.id,
      subject: topMatch!.subject,
      category: topMatch!.category,
      ...guardResult,
    },
    ranked_images: rankedImages.slice(0, 5),
  };
};
