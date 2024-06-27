// src/components/(third-party)/Fal/generateImage.ts
import * as fal from '@fal-ai/serverless-client';
import { Result } from './types';

interface GenerateImageProps {
  prompt: string;
  imageFile: File | null;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setResult: (result: Result | null) => void;
  setLogs: (logs: string[]) => void;
  setElapsedTime: (elapsedTime: number) => void;
  reset: () => void;
}

export const generateImage = async ({
  prompt,
  imageFile,
  setLoading,
  setError,
  setResult,
  setLogs,
  setElapsedTime,
  reset,
}: GenerateImageProps) => {
  reset();
  setLoading(true);
  const start = Date.now();
  try {
    const input: { prompt: string; image_url: string | File; image_size: string } = {
      prompt,
      image_url: imageFile ? imageFile : 'no-image-provided', // Placeholder value
      image_size: 'square_hd',
    };

    console.log('Input to fal.subscribe:', input); // Logging the input

    const result: Result = await fal.subscribe('fal-ai/fast-sdxl', {
      input,
      pollInterval: 3000,
      logs: true,
      onQueueUpdate(update) {
        setElapsedTime(Date.now() - start);
        if (update.status === 'IN_PROGRESS' || update.status === 'COMPLETED') {
          setLogs((update.logs || []).map((log) => log.message));
        }
      },
    });

    console.log('Result from fal.subscribe:', result); // Logging the result

    setResult(result);
  } catch (error: any) {
    console.error('Error in generateImage:', error); // Logging the error
    setError(error);
  } finally {
    setLoading(false);
    setElapsedTime(Date.now() - start);
  }
};