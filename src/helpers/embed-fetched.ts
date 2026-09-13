import { pool } from "@/db/client";
import { embedText } from "@/ai/embed";

async function embedFetched() {
  console.log("Embedding fetched images...");

  const { rows: metadatas } = await pool.query(`SELECT * FROM image_metadata`);
  const { rows: existing } = await pool.query(
    `SELECT image_id FROM image_vectors`,
  );
  const existingMap = new Map(
    existing.map((row) => [row.image_id, row.image_id]),
  );

  let success = 0;
  let failed = 0;

  for (const metadata of metadatas) {
    const description = `${metadata.caption} Notable Details:
    ${metadata.attributes.join(", ")}.`;

    if (existingMap.get(metadata.image_id)) {
      continue;
    }

    try {
      const vector = await embedText(description, metadata.image_id);

      await pool.query(
        `
        INSERT INTO image_vectors (image_id, vector) VALUES ($1, $2)
        ON CONFLICT (image_id) DO UPDATE SET vector = $2
        `,
        [metadata.image_id, vector],
      );

      success++;
      console.log(`[embedImage] image ${metadata.image_id}: success`);
    } catch (err) {
      failed++;
      console.error(
        `[embedImage] image ${metadata.image_id} failed:`,
        (err as Error).message,
      );
    }
  }

  console.log(`\nDone. ${success} images embedded. ${failed} failed.`);
}

export default embedFetched;
