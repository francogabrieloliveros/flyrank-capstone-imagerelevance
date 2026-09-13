import { z } from "zod";

export interface Post {
  id?: number;
  title: string;
  body: string;
  expectedCategory?: string;
}

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
    expectedCategory: z.string().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>["body"];

export const postIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
