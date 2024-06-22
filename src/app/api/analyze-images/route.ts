import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from "@ai-sdk/anthropic";

type SupportedImageTypes = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

function isSupportedImageType(type: string): type is SupportedImageTypes {
  return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(type);
}

export async function POST(req: NextRequest) {
  console.log("Entering POST function");
  const requestId = Math.random().toString(36).substr(2, 9); // Generate a unique request ID
  console.log(`Request ID: ${requestId} - Entering POST function`);

  try {
    const { prompt } = await req.json();
    console.log(`Request ID: ${requestId} - Received prompt:`, prompt);

    if (prompt.length > 6_464_471) {
      console.log(`Request ID: ${requestId} - Image too large`);
      return NextResponse.json({ error: "Image too large, maximum file size is 4.5MB." }, { status: 400 });
    }

    const { mimeType, image } = decodeBase64Image(prompt);
    console.log(`Request ID: ${requestId} - Decoded image data`);

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
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Begin each of the following with a triangle symbol (▲ U+25B2): First, a brief description of the image to be used as alt text. Do not describe or extract text in the description. Second, the text extracted from the image, with newlines where applicable. Un-obstruct text if it is covered by something, to make it readable. If there is no text in the image, only respond with the description. Do not include any other information. Example: ▲ Lines of code in a text editor.▲ const x = 5; const y = 10; const z = x + y; console.log(z);',
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