import Link from "next/link";
import { SignupForm } from "@/features/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p>Join Spinwheels as a renter, owner, or driver</p>
        <SignupForm />
        <p className="auth-switch">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
