import z from "zod";

export interface Suggestion {
  id: number;
  post_id: number;
  image_id: number;
  similarity: number;
  guard_result: string;
  reason: string;
  status: string;
  created_at: string;
}

export const suggestionSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
