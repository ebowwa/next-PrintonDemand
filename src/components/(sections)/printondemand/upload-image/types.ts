export interface ImageFileWithStatus {
    file: File;
    pngUrl?: string;
    status: 'pending' | 'converted' | 'verifying' | 'error';
    errorMessage?: string;
    format: 'jpeg' | 'png' | 'jpg' | 'webp' | 'heic';
    width?: number; // Add this line
    height?: number; // Add this line
  }