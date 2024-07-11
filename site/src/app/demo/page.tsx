"use client";
import React from 'react';
import AdvancedAITrainingGrid from '@/components/Q';
import OptimalTransitAITraining from '@/components/OptimalTransit';
import RFPoseOTEducation from '@/components/RFPose';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Learn About AI Training Methods</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <AdvancedAITrainingGrid />
        </div>
        <div>
          <OptimalTransitAITraining />
        </div>
        <div>
          <RFPoseOTEducation />
        </div>
      </div>
    </div>
  );
};

export default HomePage;