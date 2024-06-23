"use client";
// app/homepage/page.tsx
import TallyHeader from '@/components/(sections)/landing/TallyHeader'; 
import { LeftImageRightCopy } from '@/components/(sections)/landing/LeftImageRightCopy';
import TallyNavbar from '@/components/(sections)/landing/TallyNavbar';

export default function Homepage() {
  return (
    <div>
      <TallyNavbar /> 
      <TallyHeader /> 
      <LeftImageRightCopy /> 
    </div>
  );
}
