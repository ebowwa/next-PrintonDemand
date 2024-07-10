// src/components/(sections)/printondemand/result/ProcessedImageDetails/index.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/(sections)/printondemand/ui/Header';
import { ImageTable } from '@/components/(sections)/printondemand/ui/ImageTable';
import { analyzeImage } from './api';
import { fetchImagesFromIDB, clearImagesFromIDB } from "@/components/(sections)/printondemand/database/idbOperations";

interface AnalysisResult {
  listing: string;
  brand: string;
  bulleta: string;
  bulletb: string;
  description: string;
}

interface ImageData {
  imageData: string;
}

const useImagesFromIDB = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const allImages = await fetchImagesFromIDB();
      setImages(allImages);
    };
    loadImages();

    const handleUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      await clearImagesFromIDB();
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return { images, clearImages: clearImagesFromIDB };
};

const ProcessedImageDetails = () => {
  const { images } = useImagesFromIDB();
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);
  const [analysisResults, setAnalysisResults] = useState<{ [key: number]: AnalysisResult }>({});
  const analyzingRef = useRef(false);

  useEffect(() => {
    const newImageDataList = images.map(imageData => ({ imageData }));
    setImageDataList(newImageDataList);
  }, [images]);

  useEffect(() => {
    const analyzeImages = async () => {
      if (analyzingRef.current) return;
      analyzingRef.current = true;

      const results = { ...analysisResults };
      for (let i = 0; i < imageDataList.length; i++) {
        if (!results[i]) {
          try {
            results[i] = await analyzeImage(imageDataList[i].imageData);
          } catch (error) {
            console.error('Error analyzing image:', error);
          }
        }
      }

      setAnalysisResults(results);
      analyzingRef.current = false;
    };

    if (imageDataList.length > 0) {
      analyzeImages();
    }
  }, [imageDataList]);

  return (
    <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-8 lg:p-6">
      <div className="grid gap-4 w-full mx-auto">
        <Header title="Print on Demand Product" />
        <div className="border rounded-lg p-4 mb-8">
          <ImageTable images={imageDataList} analysisResults={analysisResults} />
        </div>
      </div>
    </main>
  );
};

export default ProcessedImageDetails;