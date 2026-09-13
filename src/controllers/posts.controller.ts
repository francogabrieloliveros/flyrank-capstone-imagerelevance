import type { Request, Response } from "express";
import type { Post } from "@/models/post.model";
import {
  addPost,
  embedPost,
  rankImagesForPost,
} from "@/services/posts.service";

export const processPost = async (req: Request, res: Response) => {
  try {
    const result = await addPost(req.body as Post);
    const embeddedResult = await embedPost(result as Post);

    res.status(201).json({
      success: true,
      message: "Post embedded to the database.",
      data: embeddedResult,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      data: [],
    });
  }
};

export const getSimilar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = parseInt(id as string);

    const similar = await rankImagesForPost(numId);

    res.status(200).json({
      success: true,
      message: "Fetched similar images to post.",
      data: similar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      data: [],
    });
  }
};
