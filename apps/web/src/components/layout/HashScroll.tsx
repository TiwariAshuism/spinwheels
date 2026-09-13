"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function revealMotionAncestors(element: HTMLElement) {
  let parent: HTMLElement | null = element;
  while (parent) {
    parent.setAttribute("data-motion-force-visible", "true");
    parent = parent.parentElement;
  }
}

function scrollToCurrentHash(attempt = 0) {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;

  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) {
    if (attempt < 16) {
      window.setTimeout(() => scrollToCurrentHash(attempt + 1), 75);
    }
    return;
  }

  revealMotionAncestors(target);

  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToCurrentHash();
    const onHashChange = () => scrollToCurrentHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
