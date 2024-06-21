// utils/hooks/useImageAnalysis.ts
import { useState, useCallback } from 'react';

interface AnalysisResult {
  productDetails: string;
}

export default function useImageAnalysis() {
  const [analysisResults, setAnalysisResults] = useState<{ [key: number]: AnalysisResult }>({});

  const analyzeImage = useCallback(async (base64Image: string, index: number) => {
    try {
      console.log('Sending request to analyze image');
      const response = await fetch('/api/analyze-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          prompt: "Analyze this product image and provide a detailed description including brand, type of product, color, and any notable features.",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze image: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let productDetails = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        productDetails += decoder.decode(value);
        setAnalysisResults(prev => ({ ...prev, [index]: { productDetails } }));
      }

      console.log('Successfully received analysis result');
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResults(prev => ({ ...prev, [index]: { productDetails: 'Error analyzing image' } }));
    }
  }, []);

  return { analyzeImage, analysisResults };
}