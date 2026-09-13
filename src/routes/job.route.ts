import { Router } from "express";
import { postBatch } from "@/controllers/job.controller";

const jobsRouter = Router();

jobsRouter.post("/jobs/run-batch", postBatch);

export default jobsRouter;
