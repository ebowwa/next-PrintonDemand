// src/components/(sections)/printondemand/ImageTable/index.tsx

import React from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody } from "@/components/ui/table";
import { ImageRow, imageTableHeaders } from '../Row';
import { AnalysisResult, ImageTableProps } from '../../types';

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
        {images.map(({ imageData }, index) => {
          return (
            <ImageRow
              key={index}
              id={index + 1}
              base64Image={imageData}
              productListing={analysisResults[index]?.listing || 'Analyzing...'}
              brand={analysisResults[index]?.brand || 'Analyzing...'}
              featureBullet1={analysisResults[index]?.bulleta || 'Analyzing...'}
              featureBullet2={analysisResults[index]?.bulletb || 'Analyzing...'}
              productDescription={analysisResults[index]?.description || 'Analyzing...'}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};
