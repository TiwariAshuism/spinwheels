"use client";

import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@spinwheels/config";
import { Button, Container } from "@spinwheels/ui";
import { SiteLink } from "@/components/layout/SiteLink";

export function Nav() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="nav" id="top">
      <Container className="nav-inner">
        <SiteLink href="/" className="brand">
          {SITE_NAME}
        </SiteLink>
        <nav className="nav-links">
          <SiteLink href="/search">Browse cars</SiteLink>
          {NAV_LINKS.map((link) => (
            <SiteLink key={link.href} href={link.href}>
              {link.label}
            </SiteLink>
          ))}
        </nav>
        <SiteLink href="/login" className="nav-signin">
          Sign in
        </SiteLink>
        <Button href="#waitlist" className="nav-cta">
          Get early access
        </Button>
        <button
          type="button"
          className={`menu-btn${open ? " open" : ""}`}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </Container>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <SiteLink href="/search" onClick={closeMenu}>
          Browse cars
        </SiteLink>
        {NAV_LINKS.map((link) => (
          <SiteLink key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </SiteLink>
        ))}
        <SiteLink href="/login" onClick={closeMenu}>
          Sign in
        </SiteLink>
      </div>
    </header>
  );
}
