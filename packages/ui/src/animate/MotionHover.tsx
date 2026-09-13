"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MotionHoverProps = {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
};

export function MotionHover({ children, className = "", lift = 6, scale = 1.02 }: MotionHoverProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -lift, scale }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
