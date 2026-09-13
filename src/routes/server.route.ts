import { Router, type Request, type Response } from "express";

const serverRouter = Router();

serverRouter.get("/", async (req: Request, res: Response) =>
  res
    .status(200)
    .json({ name: "image-tagger-api", version: "1.0", endpoints: [""] }),
);

serverRouter.get("/health", async (req: Request, res: Response) =>
  res.status(200).json({ status: "ok" }),
);

export default serverRouter;
