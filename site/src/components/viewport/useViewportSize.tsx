// src/components/ui/useViewportSize.tsx
"use client";

import { useState, useEffect } from 'react';

export const useViewportSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize size

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return size;
};
