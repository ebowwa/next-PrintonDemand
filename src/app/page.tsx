"use client";
// app/homepage/page.tsx
import TallyHeader from '@/components/(sections)/TallyHeader'; 
import { LeftImageRightCopy } from '@/components/(sections)/LeftImageRightCopy';
import TallyNavbar from '@/components/(sections)/TallyNavbar';

export default function Homepage() {
  return (
    <div>
      <TallyNavbar /> 
      <TallyHeader /> 
      <LeftImageRightCopy /> 
    </div>
  );
}
