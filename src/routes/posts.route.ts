import { getSimilar, processPost } from "@/controllers/posts.controller";
import { Router } from "express";
import validate from "@/middleware/validate";
import { createPostSchema, postIdParamSchema } from "@/validation/post.schema";

const postRouter = Router();

postRouter.post("/", validate(createPostSchema), processPost);
postRouter.get("/:id/images", validate(postIdParamSchema), getSimilar);

export default postRouter;
