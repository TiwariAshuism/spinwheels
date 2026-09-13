"use client";

import { useEffect, useState, type RefObject } from "react";

function hashTargetContainsNode(hash: string, node: HTMLElement | null) {
  if (!hash || !node) return false;
  const target = document.getElementById(hash);
  if (!target) return false;
  return node.contains(target) || target.contains(node) || node === target;
}

function hasForceVisibleFlag(node: HTMLElement | null) {
  let current = node;
  while (current) {
    if (current.getAttribute("data-motion-force-visible") === "true") return true;
    current = current.parentElement;
  }
  return false;
}

function isNodeInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function useHashReveal(ref: RefObject<HTMLElement | null>) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const revealIfNeeded = () => {
      if (hasForceVisibleFlag(node)) {
        setRevealed(true);
        return;
      }

      const hash = window.location.hash.slice(1);
      if (hashTargetContainsNode(hash, node) || isNodeInViewport(node)) {
        setRevealed(true);
      }
    };

    revealIfNeeded();
    requestAnimationFrame(revealIfNeeded);

    const timeout = window.setTimeout(() => setRevealed(true), 900);

    const observer = new MutationObserver(revealIfNeeded);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-motion-force-visible"],
      subtree: true,
    });

    window.addEventListener("hashchange", revealIfNeeded);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("hashchange", revealIfNeeded);
      observer.disconnect();
    };
  }, [ref]);

  return revealed;
}
