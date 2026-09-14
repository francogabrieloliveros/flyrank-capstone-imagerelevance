import express from "express";
import serverRouter from "@/routes/server.route";
import postRouter from "./routes/posts.route";
import suggestionRouter from "./routes/suggestion.route";
import evalRouter from "./routes/eval.route";

const app = express();

// Middlwares
app.use(express.json());
app.use("/", serverRouter);
app.use("/api/posts", postRouter);
app.use("/api/suggestions", suggestionRouter);
app.use("/api/eval", evalRouter);

export default app;
