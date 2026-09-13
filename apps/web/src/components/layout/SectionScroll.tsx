"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function scrollToId(id: string, attempt = 0) {
  const target = document.getElementById(id);
  if (!target) {
    if (attempt < 25) {
      window.setTimeout(() => scrollToId(id, attempt + 1), 100);
    }
    return;
  }

  target.scrollIntoView({ block: "start" });
}

export function SectionScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.slice(1);
    const targetId = section || hash;
    if (!targetId) return;

    scrollToId(targetId);

    if (section) {
      window.history.replaceState(null, "", `/#${section}`);
    }
  }, [pathname, section]);

  useEffect(() => {
    if (pathname !== "/") return;

    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) scrollToId(hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
