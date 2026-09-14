import { pool } from "@/db/client";
import { rankImagesForPost } from "./posts.service";
import type { Eval, EvalSet } from "@/models/eval.model";

export const runEval = async () => {
  const { rows: evalSet } = await pool.query("SELECT * FROM eval_set");

  let correct = 0;
  let total = 0;
  const details = [];

  for (const e of evalSet as EvalSet) {
    let matched = false;
    const { post_id, expected_category } = e;

    const { suggestion } = await rankImagesForPost(post_id);
    const predicted_category = suggestion?.result;
    if (expected_category === predicted_category) {
      matched = true;
      correct++;
    }

    total++;
    details.push({ post_id, expected_category, predicted_category, matched });
  }

  return {
    precision: correct / total,
    total,
    correct,
    details,
  };
};

export const addEvalSet = async (evalSet: EvalSet): Promise<Eval[]> => {
  if (evalSet.length === 0) return [];

  const valuesPlaceholders = evalSet
    .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
    .join(", ");

  const queryText = `
    INSERT INTO eval_set (post_id, expected_category)
    VALUES ${valuesPlaceholders}
    ON CONFLICT (post_id, expected_category) DO NOTHING
    RETURNING *;
  `;

  const flatValues = evalSet.flatMap((e) => [e.post_id, e.expected_category]);

  const { rows } = await pool.query<Eval>(queryText, flatValues);

  return rows;
};
