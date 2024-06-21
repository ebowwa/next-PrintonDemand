// src/app/api/analyze-image/route.ts
import { anthropic } from '@ai-sdk/anthropic';
import { StreamingTextResponse, streamText } from 'ai';

export const runtime = 'edge';

type SupportedMediaType = "image/webp" | "image/png" | "image/jpeg" | "image/gif";

function isSupportedMediaType(type: string): type is SupportedMediaType {
  return ["image/webp", "image/png", "image/jpeg", "image/gif"].includes(type);
}

export async function POST(req: Request) {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    return new Response("Anthropic API key not set", { status: 500 });
  }

  const { prompt } = await req.json();

  // Check image size (assuming base64 encoding)
  if (prompt.length > 6_464_471) {
    return new Response("Image too large, maximum file size is 4.5MB.", { status: 400 });
  }

  const { type, data } = decodeBase64Image(prompt);
  if (!type || !data) {
    return new Response("Invalid image data", { status: 400 });
  }

  if (!isSupportedMediaType(type)) {
    return new Response("Unsupported image type. Only WEBP, PNG, JPEG, and GIF are supported.", { status: 400 });
  }

  try {
    const result = await streamText({
      model: anthropic('claude-3-haiku-20240307'),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Begin each of the following with a triangle symbol (▲ U+25B2): First, a brief description of the image to be used as alt text. Do not describe or extract text in the description. Second, the text extracted from the image, with newlines where applicable. Un-obstruct text if it is covered by something, to make it readable. Do not omit relevant text. If given a tweet, output the subtweets and comments as well. If there is no text in the image, only respond with the description. Do not include any other information.",
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: type,
                data,
              },
            },
          ],
        },
      ],
    });

    return new StreamingTextResponse(result.stream);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return new Response("Error analyzing image", { status: 500 });
  }
}

function decodeBase64Image(dataString: string): { type: string | null; data: string | null } {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return { type: null, data: null };
  }
  return {
    type: matches[1],
    data: matches[2],
  };
}