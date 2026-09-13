"use server";

import { redirect } from "next/navigation";
import { mockPassword, mockUsers, ROLE_HOME } from "@spinwheels/config";
import { loginSchema, quickBookSchema, signupSchema } from "@spinwheels/validation";
import type { SessionUser } from "@spinwheels/types";
import { clearSession, setSession } from "@/lib/auth/session";

export type AuthActionState = {
  success: boolean;
  message: string;
};

export async function login(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Invalid credentials",
    };
  }

  const user = mockUsers.find((entry) => entry.email === parsed.data.email);
  if (!user || parsed.data.password !== mockPassword) {
    return { success: false, message: "Invalid email or password" };
  }

  await setSession(user);
  const next = formData.get("next");
  if (typeof next === "string" && next.startsWith("/")) {
    redirect(next);
  }
  redirect(ROLE_HOME[user.role]);
}

export async function signup(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check your details",
    };
  }

  if (mockUsers.some((entry) => entry.email === parsed.data.email)) {
    return { success: false, message: "An account with this email already exists" };
  }

  const user: SessionUser = {
    id: `user-${Date.now()}`,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    role: parsed.data.role,
    city: "Bengaluru",
    trustScore: 70,
  };

  await setSession(user);
  redirect(ROLE_HOME[user.role]);
}

export async function quickBookAuth(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = quickBookSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    carId: formData.get("carId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    pickupNote: formData.get("pickupNote") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check your details",
    };
  }

  const existing = mockUsers.find((entry) => entry.email === parsed.data.email);
  const user: SessionUser =
    existing && existing.role === "renter"
      ? existing
      : {
          id: `user-${Date.now()}`,
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          role: "renter",
          city: "Bengaluru",
          trustScore: 70,
        };

  await setSession(user);

  const params = new URLSearchParams({
    startDate: parsed.data.startDate,
    endDate: parsed.data.endDate,
  });
  if (parsed.data.pickupNote) params.set("pickupNote", parsed.data.pickupNote);

  redirect(`/cars/${parsed.data.carId}?${params.toString()}`);
}

export async function logout() {
  await clearSession();
  redirect("/login");
}
