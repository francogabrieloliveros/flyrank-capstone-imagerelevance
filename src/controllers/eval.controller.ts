import type { Request, Response } from "express";
import { addEvalSet, runEval } from "@/services/eval.service";

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

export const postEvals = async (req: Request, res: Response) => {
  try {
    const { eval_set } = req.body;
    if (!Array.isArray(eval_set) || eval_set.length === 0)
      res.status(400).json({
        success: false,
        message: "Evaluation set required.",
        data: [],
      });

    const addedEvals = await addEvalSet(eval_set);

    res.status(200).json({
      success: true,
      message: "Evaluation complete.",
      data: addedEvals,
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
