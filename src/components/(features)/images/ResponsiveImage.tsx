// Assuming the useViewportSize hook is correctly implemented as previously shown

import { useViewportSize } from '@/components/viewport/useViewportSize';
import Image from 'next/image';
import React from 'react';

interface ResponsiveImageProps {
  imageUrl: string;
  alt: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ imageUrl, alt }) => {
  const { width, height } = useViewportSize();

  // Instead of calculating the height based on an aspect ratio, 
  // we'll directly use the viewport width and height to ensure 
  // the image scales appropriately. Adjustments might be needed 
  // based on your specific layout or design requirements.
  
  // Note: The container's dimensions directly influence the Image component's size.
  // You can adjust these dimensions or use CSS classes to further customize the sizing
  // based on your design system or responsive design requirements.

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        src={imageUrl}
        alt={alt}
        width={width} // Directly use viewport width
        height={height} // Directly use viewport height
        objectFit="cover"
        className="rounded-xl"
      />
    </div>
  );
};

export default ResponsiveImage;
