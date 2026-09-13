import express from "express";
import jobsRouter from "@/routes/job.route";
import serverRouter from "@/routes/server.route";

const app = express();

// Middlwares
app.use(express.json());
app.use("/api", jobsRouter);
app.use("/", serverRouter);

export default app;
