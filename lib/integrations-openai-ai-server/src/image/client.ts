import fs from "node:fs";
import OpenAI, { toFile } from "openai";
import { Buffer } from "node:buffer";

export const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "ollama",
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || "http://localhost:11434/v1",
});

export async function generateImageBuffer(
  prompt: string,
  size: "1024x1024" | "512x512" | "256x256" = "1024x1024"
): Promise<Buffer> {
  if (!process.env.AI_IMAGE_MODEL) {
    throw new Error(
      "Image generation requires AI_IMAGE_MODEL to be set to a real " +
      "image-capable provider. Ollama qwen3.5:4b cannot generate images."
    );
  }

  const response = await openai.images.generate({
    model: process.env.AI_IMAGE_MODEL,
    prompt,
    size,
  });
  const base64 = response.data?.[0]?.b64_json ?? "";
  return Buffer.from(base64, "base64");
}

export async function editImages(
  imageFiles: string[],
  prompt: string,
  outputPath?: string
): Promise<Buffer> {
  if (!process.env.AI_IMAGE_MODEL) {
    throw new Error(
      "Image generation requires AI_IMAGE_MODEL to be set to a real " +
      "image-capable provider. Ollama qwen3.5:4b cannot generate images."
    );
  }

  const images = await Promise.all(
    imageFiles.map((file) =>
      toFile(fs.createReadStream(file), file, {
        type: "image/png",
      })
    )
  );

  const response = await openai.images.edit({
    model: process.env.AI_IMAGE_MODEL,
    image: images,
    prompt,
  });

  const imageBase64 = response.data?.[0]?.b64_json ?? "";
  const imageBytes = Buffer.from(imageBase64, "base64");

  if (outputPath) {
    fs.writeFileSync(outputPath, imageBytes);
  }

  return imageBytes;
}
