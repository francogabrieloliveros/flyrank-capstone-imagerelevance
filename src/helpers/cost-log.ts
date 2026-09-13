import { pool } from "@/db/client";

export async function logCost(entry: {
  callType: "vision" | "embedding";
  model: string;
  imageId?: number | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
  costUsd: number;
}) {
  await pool.query(
    `INSERT INTO cost_log (call_type, model, image_id, input_tokens, output_tokens, cost_usd)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      entry.callType,
      entry.model,
      entry.imageId ?? null,
      entry.inputTokens ?? null,
      entry.outputTokens ?? null,
      entry.costUsd,
    ],
  );
}
