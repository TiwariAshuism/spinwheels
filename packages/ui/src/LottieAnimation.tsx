"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Lottie } from "lottie-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

type LottieAnimationProps = {
  src: string;
  className?: string;
  loop?: boolean;
  ariaLabel?: string;
  fallback?: ReactNode;
};

export function LottieAnimation({
  src,
  className = "",
  loop = true,
  ariaLabel,
  fallback = null,
}: LottieAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const isDotLottie = src.endsWith(".lottie");

  useEffect(() => {
    setIsReady(true);
  }, [src]);

  if (prefersReducedMotion) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  if (!isReady) {
    return (
      <div className={`lottie-wrap lottie-wrap--loading ${className}`.trim()} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={`lottie-wrap ${className}`.trim()}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      {isDotLottie ? (
        <DotLottieReact
          src={src}
          loop={loop}
          autoplay
          className="lottie-player"
        />
      ) : (
        <Lottie src={src} loop={loop} autoplay className="lottie-player" />
      )}
    </div>
  );
}
