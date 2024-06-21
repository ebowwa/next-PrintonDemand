// src/components/result/ImageCard.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageComponent } from "./ImageComponent";

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