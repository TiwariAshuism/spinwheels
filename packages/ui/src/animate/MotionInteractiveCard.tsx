"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MotionInteractiveCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

export function MotionInteractiveCard({
  children,
  className = "",
  onClick,
  active = false,
}: MotionInteractiveCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`${className}${active ? " is-active" : ""}`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`${className}${active ? " is-active" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        opacity: active ? 1 : onClick ? 0.88 : 1,
        scale: active ? 1.04 : 1,
      }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
