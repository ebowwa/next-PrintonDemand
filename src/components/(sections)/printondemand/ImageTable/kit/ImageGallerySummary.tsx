// components/ImageGallerySummary.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ImageGallerySummaryProps {
  totalImages: number;
}

export const ImageGallerySummary: React.FC<ImageGallerySummaryProps> = ({ totalImages }) => {
  return (
    <Card>
      <CardContent>
        {/* Content here could be more detailed if needed */}
      </CardContent>
      <CardFooter>
        <p>Total Images: {totalImages}</p>
      </CardFooter>
    </Card>
  );
};
