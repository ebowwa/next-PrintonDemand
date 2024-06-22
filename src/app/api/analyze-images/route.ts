// src/app/api/analyze-images/route.ts
import { streamText, StreamingTextResponse } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

type SupportedImageTypes =
	| "image/jpeg"
	| "image/png"
	| "image/gif"
	| "image/webp";

function isSupportedImageType(type: string): type is SupportedImageTypes {
	return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(type);
}

export async function POST(req: Request) {
  console.log("Entering POST function");
  const requestId = Math.random().toString(36).substr(2, 9); // Generate a unique request ID
  console.log(`Request ID: ${requestId} - Entering POST function`);

  try {
    const { prompt } = await req.json();
    console.log(`Request ID: ${requestId} - Received prompt:`, prompt);

    if (prompt.length > 6_464_471) {
      console.log(`Request ID: ${requestId} - Image too large`);
      return new Response("Image too large, maximum file size is 4.5MB.", {
        status: 400,
      });
    }

    const { mimeType, image } = decodeBase64Image(prompt);
    console.log(`Request ID: ${requestId} - Decoded image data`);

    if (!mimeType || !image) {
      console.log(`Request ID: ${requestId} - Invalid image data`);
      return new Response("Invalid image data", { status: 400 });
    }

    if (!isSupportedImageType(mimeType)) {
      console.log(`Request ID: ${requestId} - Unsupported image format`);
      return new Response(
        "Unsupported format. Only JPEG, PNG, GIF, and WEBP files are supported.",
        { status: 400 }
      );
    }

    const result = await streamText({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Begin each of the following with a triangle symbol (▲ U+25B2): First, a brief description of the image to be used as alt text. Do not describe or extract text in the description. Second, the text extracted from the image, with newlines where applicable. Un-obstruct text if it is covered by something, to make it readable. If there is no text in the image, only respond with the description. Do not include any other information. Example: ▲ Lines of code in a text editor.▲ const x = 5; const y = 10; const z = x + y; console.log(z);",
            },
            {
              type: "image",
              image,
              mimeType,
            },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "▲",
            },
          ],
        },
      ],
      model: anthropic("claude-3-haiku-20240307"),
      maxTokens: 300,
    });

    console.log(`Request ID: ${requestId} - StreamText result received`);

    const text = await result.text;
    console.log(`Request ID: ${requestId} - Text result:`, text);

    return new StreamingTextResponse(result.toAIStream());
  } catch (error) {
    console.error(`Request ID: ${requestId} - Error in POST function:`, error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

function decodeBase64Image(dataString: string) {
	const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

	return {
		mimeType: matches?.[1],
		image: matches?.[2],
	};
}