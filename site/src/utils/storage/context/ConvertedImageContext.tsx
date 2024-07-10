// src/context/ConvertedImageContext.tsx
"use client"; // This directive indicates that the following code should only be run on the client side.

import React, { createContext, useContext, useState } from 'react';

// Define the shape of the image data.
interface ImageData {
  src: string;
  width: number;
  height: number;
  type: string;
  model?: string;
}

// Define the shape of the context data.
interface ImageContextType {
  showTable: boolean; // A boolean indicating whether to show a table.
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>; // A function to update the showTable state.
  images: ImageData[]; // Array to store image data.
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>; // Function to update image data.
}

// Create a context with an initial value of undefined.
const ConvertedImageContext = createContext<ImageContextType | undefined>(undefined);

// Custom hook to access the context.
export const useConvertedImageContext = () => {
  const context = useContext(ConvertedImageContext); // Retrieve the context.
  if (!context) {
    // Throw an error if the context is not available, which means the hook is used outside of a provider.
    throw new Error('useConvertedImageContext must be used within a ConvertedImageProvider');
  }
  return context; // Return the context value.
};

// Provider component that will wrap parts of the app that need access to the context.
export const ConvertedImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showTable, setShowTable] = useState(false); // State to manage whether to show a table.
  const [images, setImages] = useState<ImageData[]>([]); // State to manage image data.

  // Provide the context value to all children.
  return (
    <ConvertedImageContext.Provider value={{ showTable, setShowTable, images, setImages }}>
      {children}
    </ConvertedImageContext.Provider>
  );
};