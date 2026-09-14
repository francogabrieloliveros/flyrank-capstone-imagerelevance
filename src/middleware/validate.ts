import z from "zod";
import type { Request, Response } from "express";

const validate =
  (schema: z.ZodType) => (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(result.error),
      });
    }
    next();
  };

export default validate;
