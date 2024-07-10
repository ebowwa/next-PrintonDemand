// src/hooks/useImagesFromIDB.ts

import { useEffect, useState } from "react";
import { fetchImagesFromIDB, clearImagesFromIDB } from "@/components/(sections)/printondemand/database/idbOperations";

const useImagesFromIDB = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const allImages = await fetchImagesFromIDB();
      setImages(allImages);
    };

    loadImages();

    // Setup event listener for page unload
    const handleUnload = async (event: BeforeUnloadEvent) => {
      // Prevent default behavior to ensure the event is captured
      event.preventDefault();
      // Clear images from IDB
      await clearImagesFromIDB();
    };

    // Add the unload event listener to window
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup the event listener on component unmount or when images are re-fetched
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Return both images and a method to clear them
  return { images, clearImages: clearImagesFromIDB };
};

export default useImagesFromIDB;
