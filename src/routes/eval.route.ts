import { Router } from "express";
import { getEval, postEvals } from "@/controllers/eval.controller";
import validate from "@/middleware/validate";
import { postEvalSetSchema } from "@/models/eval.model";

const evalRouter = Router();

evalRouter.get("/", getEval);
evalRouter.post("/", validate(postEvalSetSchema), postEvals);

export default evalRouter;
