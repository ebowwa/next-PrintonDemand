// src/app/page.tsx
"use client";

import React from 'react';
import AIModelDashboard from '@/components/(third-party)/Fal/ui';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <AIModelDashboard />
    </div>
  );
};

export default HomePage;