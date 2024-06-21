// components/ImageComponent.tsx
import Image from 'next/image';
import React from "react";

export const ImageComponent = ({ base64Image, index }: { base64Image: string; index: number }) => (
  <Image
    key={index}
    src={base64Image}
    alt={`Converted Image ${index + 1}`}
    width={200} // Add width property
    height={200} // Add height property
    onError={(e) => {
      console.error('Error loading image:', e);
    }}
  />
);