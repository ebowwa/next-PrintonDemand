// app/page.tsx
"use client"
import React from 'react';
import ResumeGenerator from '@/components/(sections)/resume'; // Adjust the path according to your project structure

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ResumeGenerator />
    </div>
  );
};

export default HomePage;