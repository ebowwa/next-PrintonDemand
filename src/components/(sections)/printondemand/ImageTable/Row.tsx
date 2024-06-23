// src/components/(sections)/printondemand/table/ImageRow.tsx
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { ImageCard } from './ImageCard';
import EllipsisButton from './EllipsisButton';

interface ImageRowProps {
  id: number;
  base64Image: string;
  productDetails: string;
  reviewInfo: string;
  dateInfo: string;
}

const ProductDetails: React.FC<{ details: string }> = ({ details }) => {
  return <div>{details}</div>;
};

const ReviewInfo: React.FC<{ info: string }> = ({ info }) => {
  return <div>{info}</div>;
};

interface ImageTableHeader {
  id: string;
  label: string;
  className?: string;
}

export const imageTableHeaders: ImageTableHeader[] = [
  { id: 'number', label: '#', className: 'w-10' },
  { id: 'image', label: 'Image' },
  { id: 'brand', label:'Brand'},
  { id: 'review', label: 'Review', className: 'hidden md:table-cell' },
  { id: 'date', label: 'Date', className: 'hidden md:table-cell' },
  { id: 'actions', label: '', className: 'w-10' },
];

export const ImageRow: React.FC<ImageRowProps> = ({
  id,
  base64Image,
  productDetails,
  reviewInfo,
  dateInfo,
}) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <ImageCard base64Image={base64Image} index={id} />
      </TableCell>
      <TableCell>
        <ProductDetails details={productDetails} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <ReviewInfo info={reviewInfo} />
      </TableCell>
      <TableCell className="hidden md:table-cell">{dateInfo}</TableCell>
      <TableCell>
        <EllipsisButton />
      </TableCell>
    </TableRow>
  );
};