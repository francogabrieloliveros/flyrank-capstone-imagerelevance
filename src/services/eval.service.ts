import { pool } from "@/db/client";
import { rankImagesForPost } from "./posts.service";

export const runEval = async () => {
  const { rows: evalSet } = await pool.query("SELECT * FROM eval_set");

  let correct = 0;
  let total = 0;
  const details = [];
  for (const e of evalSet) {
    let matched = false;
    const { post_id, correct_image_id } = e;

    const { ranked_images } = await rankImagesForPost(post_id);
    const predicted_image_id = ranked_images?.[0]?.imageId;
    if (correct_image_id === predicted_image_id) {
      matched = true;
      correct++;
    }

    total++;
    details.push({ post_id, correct_image_id, predicted_image_id, matched });
  }

  return {
    precision: correct / total,
    total,
    correct,
    details,
  };
};
