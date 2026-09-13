import { redirect } from "next/navigation";
import type { UserRole } from "@spinwheels/types";
import { getSession } from "./session";

export async function requireSession(roles?: UserRole[]) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (roles && !roles.includes(session.role)) {
    redirect("/");
  }
  return session;
}
