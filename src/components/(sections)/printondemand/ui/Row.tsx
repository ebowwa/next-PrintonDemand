// src/components/(sections)/printondemand/table/ImageRow.tsx
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { ImageCard } from './ImageCard';
import EllipsisButton from './EllipsisButton';

interface ImageRowProps {
  id: number;
  base64Image: string;
  productListing: string;
  brand: string;
  featureBullet1: string;
  featureBullet2: string;
  productDescription: string;
}

const ProductListing: React.FC<{ listing: string }> = ({ listing }) => {
  return <div className="text-sm">{listing}</div>;
};

const Brand: React.FC<{ brand: string }> = ({ brand }) => {
  return <div className="text-xs text-gray-600">{brand}</div>;
};

const FeatureBullets: React.FC<{ bullet1: string; bullet2: string }> = ({ bullet1, bullet2 }) => {
  return (
    <ul className="text-xs list-disc list-inside">
      <li>{bullet1}</li>
      <li>{bullet2}</li>
    </ul>
  );
};

const ProductDescription: React.FC<{ description: string }> = ({ description }) => {
  return <div className="text-xs mt-2">{description}</div>;
};

interface ImageTableHeader {
  id: string;
  label: string;
  className?: string;
}

export const imageTableHeaders: ImageTableHeader[] = [
  { id: 'number', label: '#', className: 'w-10' },
  { id: 'image', label: 'Image' },
  { id: 'productListing', label: 'Product Listing' },
  { id: 'brand', label: 'Brand', className: 'hidden sm:table-cell' },
  { id: 'features', label: 'Features', className: 'hidden md:table-cell' },
  { id: 'description', label: 'Description', className: 'hidden lg:table-cell' },
  { id: 'actions', label: '', className: 'w-10' },
];

export const ImageRow: React.FC<ImageRowProps> = ({
  id,
  base64Image,
  productListing,
  brand,
  featureBullet1,
  featureBullet2,
  productDescription,
}) => {
  return (
    <TableRow>
      <TableCell className="py-2">{id}</TableCell>
      <TableCell className="py-2">
        <ImageCard base64Image={base64Image} index={id} />
      </TableCell>
      <TableCell className="py-2">
        <ProductListing listing={productListing} />
        <div className="sm:hidden mt-1">
          <Brand brand={brand} />
        </div>
        <div className="md:hidden mt-2">
          <FeatureBullets bullet1={featureBullet1} bullet2={featureBullet2} />
        </div>
        <div className="lg:hidden mt-2">
          <ProductDescription description={productDescription} />
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell py-2">
        <Brand brand={brand} />
      </TableCell>
      <TableCell className="hidden md:table-cell py-2">
        <FeatureBullets bullet1={featureBullet1} bullet2={featureBullet2} />
      </TableCell>
      <TableCell className="hidden lg:table-cell py-2">
        <ProductDescription description={productDescription} />
      </TableCell>
      <TableCell className="py-2">
        <EllipsisButton />
      </TableCell>
    </TableRow>
  );
};