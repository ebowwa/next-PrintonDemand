// AnimatedDot.tsx
import React from "react";
import { motion, MotionValue } from "framer-motion";

interface AnimatedDotProps {
  scrollYProgress: MotionValue<number>;
}

export const AnimatedDot: React.FC<AnimatedDotProps> = ({ scrollYProgress }) => (
  <motion.div
    transition={{ duration: 0.2, delay: 0.5 }}
    animate={{
      boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }}
    className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
  >
    <motion.div
      transition={{ duration: 0.2, delay: 0.5 }}
      animate={{
        backgroundColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
        borderColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
      }}
      className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
    />
  </motion.div>
);
