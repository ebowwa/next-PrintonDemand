// src/app/printondemand/page.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useConvertedImageContext } from '@/utils/storage/context/ConvertedImageContext';
import ProcessedImageDetails from '@/components/(sections)/printondemand';

// Dynamically import the ConvertWebp2Png component with SSR disabled
const ConvertWebp2Png = dynamic(() => import('@/components/(features)/images/ConvertWebp2Png'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function WebPConverterPage() {
  const { showTable } = useConvertedImageContext();

  return (
    <> 
      {!showTable ? (
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-semibold mb-8 text-center">Upload your Images</h1>
          <ConvertWebp2Png />
          <p className="mt-8 text-gray-600 text-center">
            Simply select or drag and drop your WebP or PNG images into the area above to convert them to PNG format.
          </p>
        </div>
      ) : (
        <ProcessedImageDetails />
      )}
    </>
  );
}