"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function revealScrollRevealAncestors(element: HTMLElement) {
  let parent = element.parentElement;
  while (parent) {
    if (parent.classList.contains("scroll-reveal")) {
      parent.classList.add("scroll-reveal-visible");
    }
    parent = parent.parentElement;
  }
}

function scrollToCurrentHash(attempt = 0) {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;

  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) {
    if (attempt < 12) {
      window.setTimeout(() => scrollToCurrentHash(attempt + 1), 50);
    }
    return;
  }

  revealScrollRevealAncestors(target);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
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
