// src/components/(sections)/printondemand/ImageTable/index.tsx

import React from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody } from "@/components/ui/table";
import { ImageRow, imageTableHeaders } from '../Row';
import { AnalysisResult, ImageTableProps } from '../../types';

export const ImageTable: React.FC<ImageTableProps> = ({ images, analysisResults }) => {
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
        {images.map(({ imageData }, index) => {
          return (
            <ImageRow
              key={index}
              id={index + 1}
              base64Image={imageData}
              productListing={analysisResults[index]?.listing || 'Analyzing...'}
              brand={analysisResults[index]?.brand || 'Analyzing...'}
              featureBullet1={analysisResults[index]?.bulleta || 'Analyzing...'}
              featureBullet2={analysisResults[index]?.bulletb || 'Analyzing...'}
              productDescription={analysisResults[index]?.description || 'Analyzing...'}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};
// # WHY the update
// THE TABLE SHOULD HAVE THESE AS COLUMNS (marked with `x` means an LLM Generates the cell content and divides row generations with a triangle symbol (▲ U+25B2))
// id
// base64image
// Product Listing: 60 Characters (x)
// Brand: 50 characters (x)
// Feature Bullet 1: 256 characters (x)
// Feature Bulet 2: 256 characters (x)
// Product Description: 2000 characters (x)
// date
// ## additional 
/**

* The '▲' character is used as a delimiter in the server's response.

* It separates the description and the extracted text in the response string.

* By splitting the result using '▲', we can easily extract these two parts. and all this is handled outside so only focus on adding new columns and do so like was done before between product reviews and product details




Here's the updated ./Row.tsx

// src/components/(sections)/printondemand/table/ImageRow.tsx
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { ImageCard } from './ImageCard';
import EllipsisButton from './EllipsisButton';
// THE TABLE SHOULD HAVE THESE AS COLUMNS (marked with `x` means an LLM Generates the cell content and divides row generations with a triangle symbol (▲ U+25B2))
// id
// base64image
// Product Listing: 60 Characters (x)
// Brand: 50 characters (x)
// Feature Bullet 1: 256 characters (x)
// Feature Bulet 2: 256 characters (x)
// Product Description: 2000 characters (x)
// date

interface ImageRowProps {
  id: number;
  base64Image: string;
  productListing: string;
  brand: string;
  featureBullet1: string;
  featureBullet2: string;
  productDescription: string;
  dateInfo: string;
}

const ProductListing: React.FC<{ listing: string }> = ({ listing }) => {
  return <div>{listing}</div>;
};

const Brand: React.FC<{ brand: string }> = ({ brand }) => {
  return <div>{brand}</div>;
};

const FeatureBullets: React.FC<{ bullet1: string; bullet2: string }> = ({ bullet1, bullet2 }) => {
  return (
    <ul>
      <li>{bullet1}</li>
      <li>{bullet2}</li>
    </ul>
  );
};

const ProductDescription: React.FC<{ description: string }> = ({ description }) => {
  return <div>{description}</div>;
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
  { id: 'brand', label: 'Brand' },
  { id: 'features', label: 'Features', className: 'hidden md:table-cell' },
  { id: 'description', label: 'Description', className: 'hidden lg:table-cell' },
  { id: 'date', label: 'Date', className: 'hidden md:table-cell' },
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
  dateInfo,
}) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <ImageCard base64Image={base64Image} index={id} />
      </TableCell>
      <TableCell>
        <ProductListing listing={productListing} />
      </TableCell>
      <TableCell>
        <Brand brand={brand} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <FeatureBullets bullet1={featureBullet1} bullet2={featureBullet2} />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <ProductDescription description={productDescription} />
      </TableCell>
      <TableCell className="hidden md:table-cell">{dateInfo}</TableCell>
      <TableCell>
        <EllipsisButton />
      </TableCell>
    </TableRow>
  );
};
*/