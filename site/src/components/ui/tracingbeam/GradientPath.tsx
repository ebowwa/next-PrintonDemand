// GradientPath.tsx
import React from "react";
import { motion } from "framer-motion";
import { ScrollingSvgProps } from "./types"

const GradientPath: React.FC<ScrollingSvgProps> = ({ svgHeight, y1, y2 }) => (
  <>
    <defs>
      <motion.linearGradient
        id="gradient"
        gradientUnits="userSpaceOnUse"
        x1="0"
        x2="0"
        y1={y1}
        y2={y2}
      >
        <stop stopColor="#18CCFC" stopOpacity="0" />
        <stop stopColor="#18CCFC" />
        <stop offset="0.325" stopColor="#6344F5" />
        <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
      </motion.linearGradient>
    </defs>
    <motion.path
      d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="1.25"
      className="motion-reduce:hidden"
      transition={{ duration: 10 }}
    />
  </>
);

export default GradientPath;
