// https://sdk.vercel.ai/docs/ai-sdk-core/generating-text
// https://docs.anthropic.com/en/api/messages
// https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic
// Jun 22, 2024 hauiku has the best price per inference at the moment in terms of price and token output value

// app/api/analyze-images/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from "@ai-sdk/anthropic";
import { isSupportedImageType } from "../utils"
import { PROMPT } from './prompt';

export async function POST(req: NextRequest) {
  console.log("Entering POST function");
  const requestId = Math.random().toString(36).substr(2, 9); // Generate a unique request ID
  console.log(`Request ID: ${requestId} - Entering POST function`);

  try {
    const { prompt } = await req.json();

    // Remove base64 string from the prompt before logging
    const promptWithoutBase64 = prompt.replace(/^data:([A-Za-z-+\/]+);base64,(.+)$/, 'data:${1};base64,***base64_data***');
    console.log(`Request ID: ${requestId} - Received prompt:`, promptWithoutBase64);

    if (prompt.length > 6_464_471) {
      console.log(`Request ID: ${requestId} - Image too large`);
      return NextResponse.json({ error: "Image too large, maximum file size is 4.5MB." }, { status: 400 });
    }

    const { mimeType, image } = decodeBase64Image(prompt);

    if (!mimeType || !image) {
      console.log(`Request ID: ${requestId} - Invalid image data`);
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }

    if (!isSupportedImageType(mimeType)) {
      console.log(`Request ID: ${requestId} - Unsupported image format`);
      return NextResponse.json({ error: "Unsupported format. Only JPEG, PNG, GIF, and WEBP files are supported." }, { status: 400 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: PROMPT,
              },
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mimeType,
                  data: image,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Request ID: ${requestId} - API response received`);

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Request ID: ${requestId} - Error in POST function:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function decodeBase64Image(dataString: string) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  return {
    mimeType: matches?.[1],
    image: matches?.[2],
  };
}