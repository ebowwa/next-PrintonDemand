/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/6UsCReE1oWY
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
"use client";
import Link from "next/link";
import { HeroSection } from "./Hero";
import { FeatureSection } from "./FeatureSection";
import { PopularCoursesSection } from "./PopularCourses";

export default function LearningPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <FeatureSection />
      <PopularCoursesSection />
    </div>
  );
}