"use client";

import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@spinwheels/config";
import { Button, Container } from "@spinwheels/ui";

export function Nav() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="nav" id="top">
      <Container className="nav-inner">
        <a href="#top" className="brand">
          {SITE_NAME}
        </a>
    <nav className="nav-links">
      <a href="/search">Browse cars</a>
      {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/login" className="nav-signin">
          Sign in
        </a>
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
        <a href="/search" onClick={closeMenu}>
          Browse cars
        </a>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a href="/login" onClick={closeMenu}>
          Sign in
        </a>
      </div>
    </header>
  );
}
