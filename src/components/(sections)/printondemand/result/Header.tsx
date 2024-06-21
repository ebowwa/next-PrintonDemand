// components/Header.tsx

// result header to the table so chevronlefticon and <h1> title could be renamed/refactored as page could use an actual header

import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icons/system";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <Button onClick={handleBack} className="w-10 h-10 rounded-full border dark:border-gray-800" size="icon">
        <ChevronLeftIcon className="w-4 h-4" />
        <span className="sr-only">Back</span>
      </Button>
      <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl">{title}</h1>
    </div>
  );
};