// app/page.tsx
'use client';

import React from 'react';
import WordArt from '@/components/(features)/WordArt'; // Adjust the import path as necessary

const Page: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Word Art Generator</h1>
      <p className="mb-4">
        Select any text on this page to generate a word art.
      </p>
      <WordArt />
    </div>
  );
};

export default Page;