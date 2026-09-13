import { runBatchJob } from "@/services/job.service";
import type { Request, Response } from "express";

export const postBatch = async (req: Request, res: Response) => {
  try {
    const summary = await runBatchJob();
    res.json(summary);
  } catch (err) {
    console.error("[POST /jobs/run-batch]", err);
    res.status(500).json({
      success: false,
      error: "batch job failed",
      detail: (err as Error).message,
    });
  }
};
