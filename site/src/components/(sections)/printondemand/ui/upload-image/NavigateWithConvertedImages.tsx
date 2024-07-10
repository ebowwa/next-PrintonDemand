// src/components/upload-image/NavigateWithConvertedImages.tsx
import React from 'react';
import { useConvertedImageContext } from '@/utils/storage/context/ConvertedImageContext';
import { storeImagesInIDB } from '@/components/(sections)/printondemand/database/idbOperations';

interface Props {
  images: { pngUrl?: string }[];
}

const NavigateWithConvertedImages: React.FC<Props> = ({ images }) => {
  const { setShowTable } = useConvertedImageContext();

  const handleShowTable = async () => {
    // Filter out images where pngUrl is undefined
    const convertedImages = images.filter(image => image.pngUrl !== undefined).map(image => image.pngUrl as string);

    if (convertedImages.length > 0) {
      // Store the converted images in the IndexedDB
      await storeImagesInIDB(convertedImages);

      // Set the showTable state to true
      setShowTable(true);
    } else {
      console.error('No converted images to store.');
    }
  };

  return (
    <button onClick={handleShowTable} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      View Converted Images
    </button>
  );
};

export default NavigateWithConvertedImages;