// src/components/sections/printondemand/GeminiProdAndConvertedImagesDetails.tsx
import React from 'react';
import { Header } from '@/components/(sections)/printondemand/result/Header';
import { ImageTable } from '@/components/(sections)/printondemand/result/ImageTable';

const ProcessedImageDetails = () => {
  return (
    <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-8 lg:p-6">
      <div className="grid gap-4 w-full mx-auto">
        <Header title="Print on Demand Product" />
        <div className="border rounded-lg p-4 mb-8">
          <ImageTable />
        </div>
      </div>
    </main>
  );
};

export default ProcessedImageDetails;