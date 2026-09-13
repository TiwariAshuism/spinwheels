import type { ReactNode } from "react";
import { SITE_NAME } from "@spinwheels/config";
import { getSession } from "@/lib/auth/session";
import { PublicNav } from "./PublicNav";

type PublicShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  hero?: boolean;
  heroArt?: ReactNode;
};

export async function PublicShell({
  children,
  title,
  subtitle,
  hero = false,
  heroArt,
}: PublicShellProps) {
  const session = await getSession();

  return (
    <div className="public-shell">
      <PublicNav session={session} />
      <section className={hero ? "public-hero" : "public-header"}>
        <div className={`wrap${heroArt ? " public-hero-grid" : ""}`}>
          <div className="public-hero-copy">
            <p className="public-kicker">Bengaluru · self-drive rentals</p>
            <h1>{title}</h1>
            {subtitle ? <p className="public-subtitle">{subtitle}</p> : null}
          </div>
          {heroArt}
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
