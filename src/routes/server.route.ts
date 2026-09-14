import { Router, type Request, type Response } from "express";

const serverRouter = Router();

serverRouter.get("/", async (req: Request, res: Response) =>
  res.status(200).json({
    name: "image-tagger-api",
    version: "1.0",
    endpoints: [
      "GET /",
      "GET /health",
      "POST /api/posts/",
      "GET /api/posts/:id/images",
      "GET /api/suggestions/:id",
      "PATCH /api/suggestions/:id/approve",
      "PATCH /api/suggestions/:id/reject",
      "POST /api/eval",
      "GET /api/eval",
    ],
  }),
);

serverRouter.get("/health", async (req: Request, res: Response) =>
  res.status(200).json({ status: "ok" }),
);

export default serverRouter;
