// components/ImageComponent.tsx
import Image from 'next/image';
import React from "react";

export const ImageComponent = ({ base64Image, index }: { base64Image: string; index: number }) => (
  <Image
    key={index}
    src={base64Image}
    alt={`Converted Image ${index + 1}`}
    style={{ maxWidth: '100%', height: 'auto' }}
    onError={(e) => {
      console.error('Error loading image:', e);
    }}
  />
);