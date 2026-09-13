import { cookies } from "next/headers";
import type { SessionUser, UserRole } from "@spinwheels/types";

const SESSION_COOKIE = "sw_session";

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    return JSON.parse(value) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser) {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export function roleAllowed(role: UserRole, pathname: string) {
  if (role === "admin") return pathname.startsWith("/admin");
  if (role === "owner") return pathname.startsWith("/owner");
  if (role === "driver") return pathname.startsWith("/driver");
  if (role === "renter") {
    return (
      pathname.startsWith("/search") ||
      pathname.startsWith("/cars") ||
      pathname.startsWith("/booking") ||
      pathname.startsWith("/trips") ||
      pathname.startsWith("/payments") ||
      pathname.startsWith("/profile")
    );
  }
  return false;
}
