// src/components/(sections)/printondemand/result/ProcessedImageDetails/api.ts
import { AnalysisResult } from "./types";
/**
 * Converts a Blob object to a Base64 encoded string.
 * @param blob - The Blob object to convert.
 * @returns A Promise that resolves to the Base64 encoded string.
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Analyzes an image to extract a description and any text contained within it.
 * @param imageData - The image data, which can be a Base64 encoded string or a Blob URL.
 * @returns A Promise that resolves to an object containing the description and extracted text.
 */
export const analyzeImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    let base64Image = imageData;

    // If the imageData is a blob URL, fetch it and convert to base64
    if (imageData.startsWith('blob:')) {
      const response = await fetch(imageData);
      const blob = await response.blob();
      base64Image = await blobToBase64(blob);
    }

    // Send the image data to the server for analysis
    const response = await fetch('api/product-descriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: base64Image }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response text to extract the description and extracted text
    const result = await response.text();

    /**
     * The '▲' character is used as a delimiter in the server's response.
     * It separates the description and the extracted text in the response string.
     * By splitting the result using '▲', we can easily extract these two parts.
     */
    const [listing, brand, bulleta, bulletb, description] = result.split('▲').slice(1);

    return {
      listing: listing?.trim() || 'No listing available',
      brand: brand?.trim() || 'No brand available',
      bulleta: bulleta?.trim() || 'No Bullet 1 available',
      bulletb: bulletb?.trim() || 'No Bullet 2 available',
      description: description?.trim() || 'No description available',
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return {
      listing: 'Analysis failed',
      brand: 'Analysis failed',
      bulleta: 'Analysis failed',
      bulletb: 'Analysis failed',
      description: 'Analysis failed',
    };
  }
};