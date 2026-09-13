import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_NAME } from "@spinwheels/config";
import { Button } from "@spinwheels/ui";
import { getSession } from "@/lib/auth/session";

type PublicShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  hero?: boolean;
};

export async function PublicShell({ children, title, subtitle, hero = false }: PublicShellProps) {
  const session = await getSession();

  return (
    <div className="public-shell">
      <header className="public-nav">
        <div className="wrap public-nav-inner">
          <Link href="/" className="brand">
            {SITE_NAME}
          </Link>
          <nav className="public-nav-links">
            <Link href="/search">Browse cars</Link>
            <Link href="/#how">How it works</Link>
            <Link href="/#waitlist">Early access</Link>
          </nav>
          <div className="public-nav-actions">
            {session ? (
              <Button href={session.role === "renter" ? "/trips" : "/owner/dashboard"} variant="outline">
                Dashboard
              </Button>
            ) : (
              <Link href="/login" className="nav-signin">
                Sign in
              </Link>
            )}
            <Button href="/search">Find a car</Button>
          </div>
        </div>
      </header>
      <section className={hero ? "public-hero" : "public-header"}>
        <div className="wrap">
          <p className="public-kicker">Bengaluru · self-drive rentals</p>
          <h1>{title}</h1>
          {subtitle ? <p className="public-subtitle">{subtitle}</p> : null}
        </div>
      </section>
      <main className="public-main">
        <div className="wrap">{children}</div>
      </main>
      <footer className="public-footer">
        <div className="wrap footer-inner">
          <span className="brand-footer">{SITE_NAME}</span>
          <span>&copy; 2026 {SITE_NAME}. Bengaluru, India.</span>
        </div>
      </footer>
    </div>
  );
}
