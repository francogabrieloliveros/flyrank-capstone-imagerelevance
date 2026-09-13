import type { Request, Response } from "express";
import { runEval } from "@/services/eval.service";

export const getEval = async (req: Request, res: Response) => {
  try {
    const evalRes = await runEval();

    res.status(200).json({
      success: true,
      message: "Evaluation complete.",
      data: evalRes,
    });
  } catch (err) {
    const message = (err as Error).message;
    res.status(500).json({
      success: false,
      message: message,
      data: [],
    });
  }
};
