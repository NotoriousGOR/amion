import type { ImagesResponse } from "openai";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../env/server.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateImage = async (
  prompt: string,
  size: string
): Promise<ImagesResponse | void> => {
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      console.log(error.toUpperCase());
    } else if (error instanceof Error) {
      console.log(error.message);
    } else if (error.response !== undefined) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
};
