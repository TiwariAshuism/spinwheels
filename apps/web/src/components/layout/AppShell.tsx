import Link from "next/link";
import type { ReactNode } from "react";
import { ROLE_NAV, SITE_NAME } from "@spinwheels/config";
import type { SessionUser } from "@spinwheels/types";
import { logout } from "@/features/auth/actions";

type AppShellProps = {
  user: SessionUser;
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export function AppShell({ user, children, title, subtitle }: AppShellProps) {
  const nav = ROLE_NAV[user.role];

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link href="/" className="app-brand">
          {SITE_NAME}
        </Link>
        <nav className="app-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="app-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="app-sidebar-foot">
          <p className="app-user-name">{user.name}</p>
          <p className="app-user-role">{user.role}</p>
          <form action={logout}>
            <button type="submit" className="app-logout">
              Log out
            </button>
          </form>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
        </header>
        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}
