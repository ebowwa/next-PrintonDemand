import React, { useState } from 'react';

import { TableRow } from "@/components/ui/table";
import { ImageCard } from './ImageCard';
import { CustomTableCell } from './CustomTableCell';
import { ProductDetails } from './ProductDetails';
import { ReviewInfo } from './ReviewInfo';
import EllipsisButton from './EllipsisButton';

interface ImageRowProps {
 id: number;
 base64Image: string;
 productDetails: string;
 reviewInfo: string;
 dateInfo: string;
}

export const ImageRow: React.FC<ImageRowProps> = ({
 id,
 base64Image,
 productDetails,
 reviewInfo,
 dateInfo,
}) => {
 return (
   <TableRow>
     <CustomTableCell>{id}</CustomTableCell>
     <CustomTableCell>
       <ImageCard base64Image={base64Image} index={id} />
     </CustomTableCell>
     <CustomTableCell>
       <ProductDetails details={productDetails} />
     </CustomTableCell>
     <CustomTableCell className="hidden md:table-cell">
       <ReviewInfo info={reviewInfo} />
     </CustomTableCell>
     <CustomTableCell className="hidden md:table-cell">{dateInfo}</CustomTableCell>
     <CustomTableCell>
       <EllipsisButton />
     </CustomTableCell>
   </TableRow>
 );
};