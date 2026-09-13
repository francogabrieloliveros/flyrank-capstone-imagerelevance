import type { Request, Response } from "express";
import {
  getSuggestionById,
  updateSuggestion,
} from "@/services/suggestion.service";

export const getSuggestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = parseInt(id as string);
    const result = await getSuggestionById(numId);

    if (!result) throw new Error("Not found.");

    res.status(200).json({
      success: true,
      message: "Fetched suggestions.",
      data: result,
    });
  } catch (err) {
    const message = (err as Error).message;
    res.status(message === "Not found." ? 404 : 500).json({
      success: false,
      message: message,
      data: [],
    });
  }
};

export const approveSuggestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = parseInt(id as string);

    const result = await updateSuggestion(numId, "approved");

    if (!result) throw new Error("Not found.");

    res.status(200).json({
      success: true,
      message: "Approved suggestion.",
      data: result,
    });
  } catch (err) {
    const message = (err as Error).message;
    res.status(message === "Not found." ? 404 : 500).json({
      success: false,
      message: message,
      data: [],
    });
  }
};

export const rejectSuggestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = parseInt(id as string);

    const result = await updateSuggestion(numId, "rejected");

    if (!result) throw new Error("Not found.");

    res.status(200).json({
      success: true,
      message: "Rejected suggestion.",
      data: result,
    });
  } catch (err) {
    const message = (err as Error).message;
    res.status(message === "Not found." ? 404 : 500).json({
      success: false,
      message: message,
      data: [],
    });
  }
};
