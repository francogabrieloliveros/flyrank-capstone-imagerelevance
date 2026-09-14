import { z } from "zod";

export interface Eval {
  post_id: number;
  expected_category: string;
}

export type EvalSet = Eval[];

const evalSchema: z.ZodType<Eval> = z.object({
  post_id: z.number(),
  expected_category: z.string(),
});

export const postEvalSetSchema = z.object({
  body: z.object({
    eval_set: z.array(evalSchema).min(1, "Evaluation set required."),
  }),
});
