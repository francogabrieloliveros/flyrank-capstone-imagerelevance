import config from "@/config";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { EmbeddingModel, LanguageModel } from "ai";

const openrouter = createOpenRouter({ apiKey: config.openRouterApiKey! });

export const visionModel: LanguageModel = openrouter.chat(config.visionModel!);
export const embedModel: EmbeddingModel = openrouter.textEmbeddingModel(
  config.embedModel!,
);
