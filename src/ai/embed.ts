import { embedModel } from "./models";
import { logCost } from "@/helpers/cost-log";
import config from "@/config";
import { embed } from "ai";

export async function embedText(
  value: string,
  imageId?: number,
): Promise<number[]> {
  const { embedding, usage } = await embed({
    model: embedModel,
    value,
  });

  await logCost({
    callType: "embedding",
    model: config.embedModel!,
    imageId: imageId ?? null,
    inputTokens: usage?.tokens ?? null,
    outputTokens: null,
    costUsd: 0,
  });

  return embedding;
}
