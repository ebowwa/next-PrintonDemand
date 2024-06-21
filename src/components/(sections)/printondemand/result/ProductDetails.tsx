// components/ProductDetails.tsx
import React from 'react';

interface ProductDetailsProps {
  details: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ details }) => {
  return <div>{details}</div>;
};
