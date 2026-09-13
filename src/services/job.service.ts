import { pool } from "../db/client";
import { classifyImage } from "../ai/classify";

const MAX_ATTEMPTS = 3;
const CONFIDENCE_FLOOR = 0.6;

export interface BatchJobSummary {
  processed: number;
  succeeded: number;
  flagged: number;
  failedRetryable: number;
  failedPermanent: number;
}

export async function runBatchJob(): Promise<BatchJobSummary> {
  const summary: BatchJobSummary = {
    processed: 0,
    succeeded: 0,
    flagged: 0,
    failedRetryable: 0,
    failedPermanent: 0,
  };

  const { rows: pending } = await pool.query(
    `SELECT id, url FROM images WHERE status IN ('pending','failed') AND attempts < $1`,
    [MAX_ATTEMPTS],
  );

  for (const img of pending) {
    summary.processed++;

    await pool.query(
      `UPDATE images SET status='processing', attempts=attempts+1 WHERE id=$1`,
      [img.id],
    );

    let tag;
    try {
      tag = await classifyImage(img.id, img.url);
    } catch (err) {
      console.error(
        `[batchJob] image ${img.id} threw during classification:`,
        err,
      );
      tag = null;
    }

    if (!tag) {
      const { rows } = await pool.query(
        `SELECT attempts FROM images WHERE id=$1`,
        [img.id],
      );
      const permanent = rows[0].attempts >= MAX_ATTEMPTS;
      const status = permanent ? "failed_permanent" : "failed";
      await pool.query(`UPDATE images SET status=$1 WHERE id=$2`, [
        status,
        img.id,
      ]);
      permanent ? summary.failedPermanent++ : summary.failedRetryable++;
      continue;
    }

    const flagged = tag.confidence < CONFIDENCE_FLOOR;
    if (flagged) summary.flagged++;

    await pool.query(
      `INSERT INTO image_metadata (image_id, subject, category, attributes, caption, confidence, flagged, raw_model_output)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (image_id) DO UPDATE SET
         subject=$2, category=$3, attributes=$4, caption=$5, confidence=$6, flagged=$7, raw_model_output=$8`,
      [
        img.id,
        tag.subject,
        tag.category,
        tag.attributes,
        tag.caption,
        tag.confidence,
        flagged,
        tag,
      ],
    );
    await pool.query(`UPDATE images SET status='done' WHERE id=$1`, [img.id]);
    summary.succeeded++;
  }

  return summary;
}
