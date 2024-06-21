// components/ReviewInfo.tsx
import React from 'react';

interface ReviewInfoProps {
  info: string;
}

export const ReviewInfo: React.FC<ReviewInfoProps> = ({ info }) => {
  return <div>{info}</div>;
};