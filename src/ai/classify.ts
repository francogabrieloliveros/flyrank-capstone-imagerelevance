import fs from "node:fs/promises";
import path from "node:path";
import config from "@/config";
import { ImageTagSchema, type ImageTag } from "./schema";
import { logCost } from "@/helpers/cost-log";
import { generateText, Output, zodSchema } from "ai";
import { visionModel } from "./models";

const SYSTEM_PROMPT = `
  You are an accurate image tagging system. Given an image, try to analyze it based on the given guidelines.

  Guidelines:
    1. "subject" should be the specific thing pictured (e.g. "red fox", not just "animal").
    2. "category" should be a coarse bucket (e.g. "animal", "landscape", "food", "object").
    3. "attributes" should have 1-8 strings that provide additional specfic information that describe the image.
    4. "caption" is a single short sentence that describes the image.
    5. "confidence" is a floating point value from 0-1 . It must reflect your genuine certainty about "subject"
       and "category" — do not default to high number, and do not round up when you are actually unsure (e.g. a
       fox vs. wolf that's hard to tell).

  Respond with ONLY a JSON object matching this exact shape, no prose, no markdown fences:

  {
    "subject": string,
    "category": string,
    "attributes": string[],
    "caption": string,
    "confidence": number 0-1
  }
  `;

function guessMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

async function fileToDataUri(relativePath: string): Promise<string> {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const buffer = await fs.readFile(absolutePath);
  const mime = guessMimeType(relativePath);
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export async function classifyImage(
  imageId: number,
  imagePath: string,
): Promise<ImageTag | null> {
  const dataUri = await fileToDataUri(imagePath);

  const completion = await generateText({
    model: visionModel,
    system: SYSTEM_PROMPT,
    output: Output.object({ schema: ImageTagSchema }),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Tag this image." },
          { type: "file", data: dataUri, mediaType: "image" },
        ],
      },
    ],
    temperature: 0,
  });

  const raw = completion.text;

  await logCost({
    callType: "vision",
    model: config.visionModel!,
    imageId,
    inputTokens: completion.usage.inputTokens ?? null,
    outputTokens: completion.usage.outputTokens ?? null,
    costUsd: 0,
  });

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    console.warn(
      `[classifyImage] image ${imageId}: response was not valid JSON:`,
      raw,
    );
    return null;
  }

  const result = ImageTagSchema.safeParse(parsedJson);
  if (!result.success) {
    console.warn(
      `[classifyImage] image ${imageId}: schema validation failed:`,
      result.error.issues,
    );
    return null;
  }

  console.log(`[classifyImage] image ${imageId}: success`);

  return result.data;
}
