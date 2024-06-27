// @/components/(third-party)/Fal/Home.tsx
// this works but the ui is fugly 
import React, { useMemo, useState } from 'react';
import * as fal from '@fal-ai/serverless-client';
import Error from '../Error';
import { Result } from '../types';
import { generateImage } from '../generateImage';

fal.config({
  proxyUrl: '/api/fal/proxy', // the built-int nextjs proxy
});

const DEFAULT_PROMPT =
  '(masterpiece:1.4), (best quality), (detailed), Medieval village scene with busy streets and castle in the distance';

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(DEFAULT_PROMPT);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const image = useMemo(() => {
    if (!result) {
      return null;
    }
    if (result.image) {
      console.log('Image URL:', result.image.url); // Logging the image URL
      return result.image;
    }
    return null;
  }, [result]);

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
    setLogs([]);
    setElapsedTime(0);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-100">
      <main className="container dark:text-gray-50 text-gray-900 flex flex-col items-center justify-center w-full flex-1 py-10 space-y-8">
        <h1 className="text-4xl font-bold mb-8">
          Hello <code className="font-light text-pink-600">fal</code>
        </h1>
        <div className="text-lg w-full">
          <label htmlFor="prompt" className="block mb-2 text-current">
            Image (Optional)
          </label>
          <input
            className="w-full text-lg p-2 rounded bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/10"
            id="image_url"
            name="image_url"
            type="file"
            placeholder="Choose a file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div className="text-lg w-full">
          <label htmlFor="prompt" className="block mb-2 text-current">
            Prompt
          </label>
          <input
            className="w-full text-lg p-2 rounded bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/10"
            id="prompt"
            name="prompt"
            placeholder="Imagine..."
            value={prompt}
            autoComplete="off"
            onChange={(e) => setPrompt(e.target.value)}
            onBlur={(e) => setPrompt(e.target.value.trim())}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            generateImage({
              prompt,
              imageFile,
              setLoading,
              setError,
              setResult,
              setLogs,
              setElapsedTime,
              reset,
            });
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-3 px-6 mx-auto rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        <Error error={error} />

        <div className="w-full flex flex-col space-y-4">
          <div className="mx-auto">
            {image && (
              <img src={image.url} alt="" />
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-light">JSON Result</h3>
            <p className="text-sm text-current/80">
              {`Elapsed Time (seconds): ${(elapsedTime / 1000).toFixed(2)}`}
            </p>
            <pre className="text-sm bg-black/70 text-white/80 font-mono h-60 rounded whitespace-pre overflow-auto w-full">
              {result
                ? JSON.stringify(result, null, 2)
                : '// result pending...'}
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-light">Logs</h3>
            <pre className="text-sm bg-black/70 text-white/80 font-mono h-60 rounded whitespace-pre overflow-auto w-full">
              {logs.filter(Boolean).join('\n')}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;