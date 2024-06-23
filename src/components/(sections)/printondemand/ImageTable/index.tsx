// src/components/(sections)/printondemand/ImageTable/index.tsx

import React from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody } from "@/components/ui/table";
import { ImageRow, imageTableHeaders } from './Row';

interface AnalysisResult {
  description: string;
  extractedText: string;
}

interface ImageWithUUID {
  imageData: string;
}

interface ImageTableProps {
  images: ImageWithUUID[];
  analysisResults: { [key: number]: AnalysisResult };
}

export const ImageTable: React.FC<ImageTableProps> = ({ images, analysisResults }) => {
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
        {images.map(({ imageData }, index) => (
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