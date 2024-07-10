// ScrollingSvg.tsx
import React from "react";
import { motion } from "framer-motion";
import GradientPath from "./GradientPath"; 
import { ScrollingSvgProps } from "./types"

const ScrollingSvg: React.FC<ScrollingSvgProps> = ({ svgHeight, y1, y2 }) => (
  <svg
    viewBox={`0 0 20 ${svgHeight}`}
    width="20"
    height={svgHeight}
    className="ml-4 block"
    aria-hidden="true"
  >
    <motion.path
      d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
      fill="none"
      stroke="#9091A0"
      strokeOpacity="0.16"
      transition={{ duration: 10 }}
    />
    <GradientPath svgHeight={svgHeight} y1={y1} y2={y2} />
  </svg>
);

export default ScrollingSvg;
