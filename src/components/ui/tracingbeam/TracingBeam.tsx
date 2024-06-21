// needs extensive revision  trace beam should go to the current row view
// see https://ui.aceternity.com/components/tracing-beam
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/utils/cn";
import { AnimatedDot } from "./AnimatedDot";
import ScrollingSvg from "./SVGBeam";
import { TracingBeamProps } from "./types"

export const TracingBeam: React.FC<TracingBeamProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), { stiffness: 500, damping: 90 });
  const y2: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), { stiffness: 500, damping: 90 });

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <AnimatedDot scrollYProgress={scrollYProgress} />
        <ScrollingSvg svgHeight={svgHeight} y1={y1.get()} y2={y2.get()} />
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
