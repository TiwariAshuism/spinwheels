"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MotionFloatProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
};

export function MotionFloat({ children, className = "", distance = 8, duration = 4 }: MotionFloatProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
