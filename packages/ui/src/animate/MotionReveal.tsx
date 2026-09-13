"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { easeOut, fadeDown, fadeIn, fadeUp, scaleIn, slideLeft, slideRight } from "./variants";
import { useHashReveal } from "./useHashReveal";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  once?: boolean;
  amount?: number;
};

const variantMap = {
  up: fadeUp,
  down: fadeDown,
  left: slideLeft,
  right: slideRight,
  scale: scaleIn,
  fade: fadeIn,
};

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.18,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const forceVisible = useHashReveal(ref);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={forceVisible ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variantMap[direction]}
      transition={{ duration: 0.65, delay: delay / 1000, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
