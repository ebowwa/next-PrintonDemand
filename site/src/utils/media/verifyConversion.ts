// src/utils/verifyConversion.ts
import { ImageFileWithStatus } from "@/components/(sections)/printondemand/ui/upload-image/types";

export const verifyConversion = (imageFileWithStatus: ImageFileWithStatus, updateImageStatus: (index: number, status: ImageFileWithStatus['status'], errorMessage?: string) => void, index: number) => {
  if (!imageFileWithStatus.pngUrl) return;

  const verificationImage = new Image();
  verificationImage.onload = () => updateImageStatus(index, 'converted');
  verificationImage.onerror = () => updateImageStatus(index, 'error', 'Conversion failed during verification.');
  verificationImage.src = imageFileWithStatus.pngUrl;
};
