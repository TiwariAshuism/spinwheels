"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children: ReactNode;
};

function splitHashHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const path = href.slice(0, hashIndex) || "/";
  return { path, href };
}

export function SiteLink({ href, children, onClick, ...rest }: SiteLinkProps) {
  const pathname = usePathname();
  const hashLink = splitHashHref(href);

  if (hashLink) {
    const needsFullNavigation = pathname !== hashLink.path;

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      if (needsFullNavigation) {
        event.preventDefault();
        window.location.href = hashLink.href;
      }
    };

    return (
      <a href={hashLink.href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
