// ImageCard.tsx
import Image from 'next/image';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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

interface ImageCardProps {
  base64Image: string;
  index: number;
}

export const ImageCard: React.FC<ImageCardProps> = ({ base64Image, index }) => {
  return (
    <Card style={{ maxWidth: "100%", overflow: "hidden" }}>
      <CardContent style={{ padding: 0 }}>
        <ImageComponent base64Image={base64Image} index={index} />
      </CardContent>
    </Card>
  );
};