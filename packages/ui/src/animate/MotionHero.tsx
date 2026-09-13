"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { easeOut } from "./variants";

type MotionHeroProps = {
  children: ReactNode;
  className?: string;
};

export function MotionHero({ children, className = "" }: MotionHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
