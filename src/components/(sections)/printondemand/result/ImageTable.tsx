// components/ImageTable.tsx
import React from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody } from "@/components/ui/table";
import { ImageRow } from './ImageRow';
import useImagesFromIDB from "@/utils/storage/hooks/useImagesFromIDB";

// Define types for content structure
interface ImageTableHeader {
  id: string;
  label: string;
  className?: string;
}

interface ImageTableRow {
  productDetails: string;
  reviewInfo: string;
  dateInfo: string;
}

// Define content objects
const imageTableHeaders: ImageTableHeader[] = [
  { id: 'number', label: '#', className: 'w-10' },
  { id: 'image', label: 'Image' },
  { id: 'productDetails', label: 'Product Details' },
  { id: 'review', label: 'Review', className: 'hidden md:table-cell' },
  { id: 'date', label: 'Date', className: 'hidden md:table-cell' },
  { id: 'actions', label: '', className: 'w-10' },
];

const imageTableRowContent: ImageTableRow = {
  productDetails: 'Sample Product Details',
  reviewInfo: 'Sample Review Info',
  dateInfo: 'Sample Date Info',
};

export const ImageTable = () => {
  const { images } = useImagesFromIDB();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {imageTableHeaders.map((header) => (
            <TableHead key={header.id} className={header.className}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {images.map((base64Image, index) => (
          <ImageRow
            key={index}
            id={index + 1}
            base64Image={base64Image}
            productDetails={imageTableRowContent.productDetails}
            reviewInfo={imageTableRowContent.reviewInfo}
            dateInfo={imageTableRowContent.dateInfo}
          />
        ))}
      </TableBody>
    </Table>
  );
};