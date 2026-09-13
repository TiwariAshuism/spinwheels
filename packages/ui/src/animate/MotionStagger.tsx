"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { staggerContainer, staggerItem } from "./variants";
import { useHashReveal } from "./useHashReveal";

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
};

type MotionStaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function MotionStagger({
  children,
  className = "",
  once = true,
  amount = 0.12,
}: MotionStaggerProps) {
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
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({ children, className = "" }: MotionStaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
