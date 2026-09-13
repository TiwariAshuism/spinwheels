import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage bookings, trips, and payments on Spinwheels.",
};

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = typeof params.next === "string" && params.next.startsWith("/") ? params.next : undefined;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p>{nextPath ? "Sign in to continue where you left off." : "Access your Spinwheels account"}</p>
        <LoginForm nextPath={nextPath} />
        <p className="auth-switch">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
