// src/components/sections/printondemand/upload-image/ImageStatusTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from './StatusBadge';
import Image from 'next/image';
import { ImageFileWithStatus } from "./types";


const ImageStatusTable: React.FC<{ images: ImageFileWithStatus[] }> = ({ images }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Preview</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {images.map((image, index) => (
          <TableRow key={index}>
            <TableCell>
              {['converted', 'verifying'].includes(image.status) && image.pngUrl ? (
                <Image 
                  alt="Image Preview" 
                  className="rounded-md" 
                  src={image.pngUrl} 
                  width={100} // Set a default width
                  height={100} // Set a default height
                  unoptimized // Use unoptimized prop for blob URLs
                />
              ) : (
                <span className="text-sm">Loading...</span>
              )}
            </TableCell>
            <TableCell>{image.file.name}</TableCell>
            <TableCell>
              <StatusBadge status={image.status} errorMessage={image.errorMessage} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImageStatusTable;