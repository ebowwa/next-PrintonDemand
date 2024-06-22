import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody } from "@/components/ui/table";
import { ImageRow } from './ImageRow';
import useImagesFromIDB from "@/utils/storage/hooks/useImagesFromIDB";

interface ImageTableHeader {
  id: string;
  label: string;
  className?: string;
}

interface AnalysisResult {
  description: string;
  extractedText: string;
}

const imageTableHeaders: ImageTableHeader[] = [
  { id: 'number', label: '#', className: 'w-10' },
  { id: 'image', label: 'Image' },
  { id: 'productDetails', label: 'Product Details' },
  { id: 'review', label: 'Review', className: 'hidden md:table-cell' },
  { id: 'date', label: 'Date', className: 'hidden md:table-cell' },
  { id: 'actions', label: '', className: 'w-10' },
];

export const ImageTable = () => {
  const { images } = useImagesFromIDB();
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const analyzeImage = async (imageData: string): Promise<AnalysisResult> => {
    try {
      let base64Image = imageData;

      // If the imageData is a blob URL, fetch it and convert to base64
      if (imageData.startsWith('blob:')) {
        const response = await fetch(imageData);
        const blob = await response.blob();
        base64Image = await blobToBase64(blob);
      }

      const response = await fetch('/api/analyze-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: base64Image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      const [description, extractedText] = result.split('▲').slice(1);

      return {
        description: description?.trim() || 'No description available',
        extractedText: extractedText?.trim() || 'No text extracted'
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      return { description: 'Analysis failed', extractedText: 'Error occurred' };
    }
  };

  useEffect(() => {
    const analyzeImages = async () => {
      const results = await Promise.all(
        images.map(async (imageData) => {
          return await analyzeImage(imageData);
        })
      );
      setAnalysisResults(results);
    };

    if (images.length > 0) {
      analyzeImages();
    }
  }, [images]);

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {imageTableHeaders.map((header) => (
            <TableHead key={header.id} className={header.className}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {images.map((imageData, index) => (
          <ImageRow
            key={index}
            id={index + 1}
            base64Image={imageData}
            productDetails={analysisResults[index]?.description || 'Analyzing...'}
            reviewInfo={analysisResults[index]?.extractedText || 'Analyzing...'}
            dateInfo="N/A"
          />
        ))}
      </TableBody>
    </Table>
  );
};