import { z } from "zod";

export const ImageTagSchema = z.object({
  subject: z.string().min(1),
  category: z.string().min(1),
  attributes: z.array(z.string()).min(1).max(8),
  caption: z.string().min(1),
  confidence: z.number().min(0).max(1),
});

export type ImageTag = z.infer<typeof ImageTagSchema>;
