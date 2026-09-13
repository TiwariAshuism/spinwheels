import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { SessionUser } from "@spinwheels/types";

const PUBLIC_PREFIXES = ["/", "/login", "/signup", "/search", "/cars", "/book", "/api"];

function getSessionFromRequest(request: NextRequest): SessionUser | null {
  const raw = request.cookies.get("sw_session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

function isPublicPath(pathname: string) {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => prefix !== "/" && (pathname === prefix || pathname.startsWith(`${prefix}/`)),
  );
}

function pathRequiresAuth(pathname: string) {
  return (
    pathname.startsWith("/owner") ||
    pathname.startsWith("/driver") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/trips") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/booking")
  );
}

function roleCanAccess(role: SessionUser["role"], pathname: string) {
  if (pathname.startsWith("/admin")) return role === "admin";
  if (pathname.startsWith("/owner")) return role === "owner";
  if (pathname.startsWith("/driver")) return role === "driver";
  if (
    pathname.startsWith("/trips") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/booking")
  ) {
    return role === "renter";
  }
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname === "/sw.js" ||
    pathname === "/manifest.webmanifest"
  ) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!pathRequiresAuth(pathname)) {
    return NextResponse.next();
  }

  const session = getSessionFromRequest(request);
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!roleCanAccess(session.role, pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|sw.js|manifest.webmanifest).*)"],
};
