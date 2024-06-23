"use client";
// app/homepage/page.tsx
import TallyHeader from '@/components/(sections)/landing/Header'; 
import { LeftImageRightCopy } from '@/components/(sections)/landing/LeftImageRightCopy';
import TallyNavbar from '@/components/(sections)/landing/Navbar';
import { LandingFooter } from '@/components/(sections)/landing/Footer';

export default function Homepage() {
  return (
    <div>
      <TallyNavbar /> 
      <TallyHeader /> 
      <LeftImageRightCopy /> 
      <LandingFooter />
    </div>
  );
}
