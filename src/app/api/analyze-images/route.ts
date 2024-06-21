// src/app/api/analyze-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

type SupportedMediaType = "image/webp" | "image/png" | "image/jpeg" | "image/gif";

function isSupportedMediaType(type: string): type is SupportedMediaType {
  return ["image/webp", "image/png", "image/jpeg", "image/gif"].includes(type);
}

export async function POST(req: NextRequest) {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    return NextResponse.json({ error: "Anthropic API key not set" }, { status: 500 });
  }

  const anthropic = new Anthropic({ apiKey: anthropicApiKey });
  const { image, prompt } = await req.json();

  // Check image size (assuming base64 encoding)
  if (image.length > 6_464_471) {
    return NextResponse.json({ error: "Image too large, maximum file size is 4.5MB." }, { status: 400 });
  }

  const { type, data } = decodeBase64Image(image);
  if (!type || !data) {
    return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
  }

  if (!isSupportedMediaType(type)) {
    return NextResponse.json({ error: "Unsupported image type. Only WEBP, PNG, JPEG, and GIF are supported." }, { status: 400 });
  }

  try {
    const response = await anthropic.messages.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt || "Analyze this product image and provide a detailed description including brand, type of product, color, and any notable features.",
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
      model: "claude-3-haiku-20240307",
      stream: true,
      max_tokens: 1000,
    });

    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: "Error analyzing image" }, { status: 500 });
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