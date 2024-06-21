// src/app/printondemand/layout.tsx
import { ConvertedImageProvider } from '@/utils/storage/context/ConvertedImageContext';

export default function PrintOnDemandLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvertedImageProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">{children}</main>
      </div>
    </ConvertedImageProvider>
  );
}