"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.classList.add("scroll-reveal-visible");

    const hash = window.location.hash.slice(1);
    if (hash && node.querySelector(`#${CSS.escape(hash)}`)) {
      reveal();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(node);
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(node);

    const checkVisible = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal();
        observer.unobserve(node);
      }
    };

    checkVisible();
    requestAnimationFrame(checkVisible);

    const timeout = window.setTimeout(() => {
      reveal();
      observer.unobserve(node);
    }, 800);

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const classes = ["scroll-reveal", `scroll-reveal-${direction}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
