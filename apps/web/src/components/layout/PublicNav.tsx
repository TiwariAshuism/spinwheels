"use client";

import { useState } from "react";
import { SITE_NAME } from "@spinwheels/config";
import { Button } from "@spinwheels/ui";
import type { SessionUser } from "@spinwheels/types";
import { SiteLink } from "./SiteLink";

type PublicNavProps = {
  session: SessionUser | null;
};

const PUBLIC_LINKS = [
  { href: "/search", label: "Browse cars" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/?section=waitlist", label: "Early access" },
] as const;

export function PublicNav({ session }: PublicNavProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="public-nav">
      <div className="wrap public-nav-inner">
        <SiteLink href="/" className="brand" onClick={closeMenu}>
          {SITE_NAME}
        </SiteLink>
        <nav className="public-nav-links">
          {PUBLIC_LINKS.map((link) => (
            <SiteLink key={link.href} href={link.href}>
              {link.label}
            </SiteLink>
          ))}
        </nav>
        <div className="public-nav-actions">
          {session ? (
            <Button href={session.role === "renter" ? "/trips" : "/owner/dashboard"} variant="outline">
              Dashboard
            </Button>
          ) : (
            <SiteLink href="/login" className="nav-signin">
              Sign in
            </SiteLink>
          )}
          <Button href="/search">Find a car</Button>
          <button
            type="button"
            className={`menu-btn public-menu-btn${open ? " open" : ""}`}
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu public-mobile-menu${open ? " open" : ""}`}>
        {PUBLIC_LINKS.map((link) => (
          <SiteLink key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </SiteLink>
        ))}
        {session ? (
          <SiteLink
            href={session.role === "renter" ? "/trips" : "/owner/dashboard"}
            onClick={closeMenu}
          >
            Dashboard
          </SiteLink>
        ) : (
          <SiteLink href="/login" onClick={closeMenu}>
            Sign in
          </SiteLink>
        )}
      </div>
    </header>
  );
}
