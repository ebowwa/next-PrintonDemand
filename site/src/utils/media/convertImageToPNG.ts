// src/utils/convertImageToPNG.ts
import { ImageFileWithStatus } from '@/components/(sections)/printondemand/ui/upload-image/types';


export const convertImageToPNG = (image: HTMLImageElement, index: number, setImages: React.Dispatch<React.SetStateAction<ImageFileWithStatus[]>>, verifyConversionCallback: (imageFileWithStatus: ImageFileWithStatus, index: number) => void) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, 0, 0);
  canvas.toBlob(blob => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setImages(currentImages => {
      const newImages = [...currentImages];
      newImages[index] = { ...newImages[index], pngUrl: url, status: 'verifying', width: image.width, height: image.height };
      verifyConversionCallback({...newImages[index], pngUrl: url, status: 'verifying', width: image.width, height: image.height}, index);
      return newImages;
    });
  }, 'image/png');
};