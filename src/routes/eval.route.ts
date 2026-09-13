import { Router } from "express";
import { getEval } from "@/controllers/eval.controller";

const evalRouter = Router();

evalRouter.get("/", getEval);

export default evalRouter;
