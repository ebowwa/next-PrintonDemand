"use client";
// src/components/ConvertWebp2Png.tsx
// going to rename png standard need to add jpeg and jpg support ASAP
// imported @app/web/page.tsx
import React, { useState } from 'react';
import { z } from 'zod';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageStatusTable from '@/components/(sections)/printondemand/ui/upload-image/ImageStatusTable';
import NavigateWithConvertedImages from '@/components/(sections)/printondemand/ui/upload-image/NavigateWithConvertedImages';
import { verifyConversion } from '@/utils/media/verifyConversion';
import { convertImageToPNG } from '@/utils/media/convertImageToPNG';
import { ImageFileWithStatus } from '@/components/(sections)/printondemand/ui/upload-image/types';

const fileSchema = z.object({
  file: z.instanceof(File).refine(file => ['image/webp', 'image/png'].includes(file.type), "The file must be a WebP or PNG image"),
});
const FilesSchema = z.array(fileSchema);

const ConvertWebp2Png: React.FC = () => {
  const [images, setImages] = useState<ImageFileWithStatus[]>([]);

  const updateImageStatus = (index: number, status: ImageFileWithStatus['status'], errorMessage?: string) => {
    setImages(currentImages => {
      const newImages = [...currentImages];
      newImages[index] = { ...newImages[index], status, errorMessage };
      return newImages;
    });
  };

  const processImageFile = (imageFileWithStatus: ImageFileWithStatus, index: number) => {
    if (imageFileWithStatus.format === 'png') {
      updateImageStatus(index, 'converted');
    } else if (imageFileWithStatus.format === 'webp') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target?.result as string;
        image.onload = () => convertImageToPNG(image, index, setImages, (img, idx) => verifyConversion(img, updateImageStatus, idx));
      };
      reader.readAsDataURL(imageFileWithStatus.file);
    }
  };

  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
  
    const files = Array.from(e.target.files);
    const validatedFiles: ImageFileWithStatus[] = files.map(file => {
      const format = file.type === 'image/png' ? 'png' : 'webp';
      const status = FilesSchema.safeParse([{ file }]).success ? 'pending' : 'error';
      const errorMessage = FilesSchema.safeParse([{ file }]).success ? undefined : "Invalid file type. Only WebP and PNG images are accepted.";
  
      if (format === 'png') {
        const pngUrl = URL.createObjectURL(file);
        return { file, status: 'converted', pngUrl, format };
      }
  
      return { file, status, errorMessage, format };
    });
  
    setImages(validatedFiles);
  
    validatedFiles.forEach((imageFileWithStatus, index) => {
      if (imageFileWithStatus.format === 'webp' && imageFileWithStatus.status === 'pending') {
        processImageFile(imageFileWithStatus, index);
      }
    });
  };  

  return (
    <>
      <div className="w-full max-w-sm border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center gap-2">
        <Label htmlFor="images">Select images</Label>
        <Input accept="image/webp,image/png" id="images" multiple type="file" onChange={handleFileSelection} />
        <span className="text-sm text-gray-500">Drag and drop images or click to select them from your computer.</span>
      </div>
      <ImageStatusTable images={images} />
      <NavigateWithConvertedImages images={images.filter(image => image.status === 'converted')} />
    </>
  );
};

export default ConvertWebp2Png;
