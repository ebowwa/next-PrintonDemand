// components/Header.tsx
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icons/system";
import WordArtComponent from '@/components/(features)/WordArt';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showWordArt, setShowWordArt] = useState(false);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const toggleWordArt = useCallback(() => {
    setShowWordArt(prevState => !prevState);
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={handleBack} className="w-10 h-10 rounded-full border dark:border-gray-800" size="icon">
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl">{title}</h1>
        <Button onClick={toggleWordArt} className="ml-auto">
          {showWordArt ? 'Hide Word Art' : 'Show Word Art'}
        </Button>
      </div>
      {showWordArt && <WordArtComponent />}
    </div>
  );
};