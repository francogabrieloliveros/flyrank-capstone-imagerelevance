import express from "express";
import serverRouter from "@/routes/server.route";
import postRouter from "./routes/posts.route";

const app = express();

// Middlwares
app.use(express.json());
app.use("/", serverRouter);
app.use("/api/posts", postRouter);

export default app;
