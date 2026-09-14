import { pool } from "@/db/client";
import { type Suggestion } from "@/models/suggestion.model";

export const getSuggestionById = async (
  id: number,
): Promise<Suggestion | null> => {
  const { rows } = await pool.query(`SELECT * FROM suggestions WHERE id = $1`, [
    id,
  ]);
  if (rows.length === 0) return null;

  return rows[0];
};

export const updateSuggestion = async (
  id: number,
  status: "approved" | "rejected" | "pending",
): Promise<Suggestion | null> => {
  const result = await pool.query(
    `UPDATE suggestions SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id],
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
};
