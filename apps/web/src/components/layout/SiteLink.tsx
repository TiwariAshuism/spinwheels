"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children: ReactNode;
};

type ParsedHref =
  | { kind: "route"; href: string }
  | { kind: "hash"; path: string; hash: string; full: string };

function parseHref(href: string): ParsedHref {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { kind: "route", href };
  }

  const path = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex);
  return { kind: "hash", path, hash, full: `${path}${hash}` };
}

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  let parent = target.parentElement;
  while (parent) {
    if (parent.classList.contains("scroll-reveal")) {
      parent.classList.add("scroll-reveal-visible");
    }
    parent = parent.parentElement;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteLink({ href, children, onClick, ...rest }: SiteLinkProps) {
  const pathname = usePathname();
  const parsed = parseHref(href);

  if (parsed.kind === "route") {
    return (
      <Link href={parsed.href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  const onTargetPage = pathname === parsed.path;
  const anchorHref = onTargetPage ? parsed.hash : parsed.full;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();

    if (!onTargetPage) {
      window.location.assign(parsed.full);
      return;
    }

    if (window.location.hash !== parsed.hash) {
      window.history.pushState(null, "", parsed.full);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      return;
    }

    scrollToHash(parsed.hash);
  };

  return (
    <a href={anchorHref} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
