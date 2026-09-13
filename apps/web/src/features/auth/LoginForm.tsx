"use client";

import { useActionState } from "react";
import { Button, Input } from "@spinwheels/ui";
import { login, type AuthActionState } from "./actions";

type LoginFormProps = {
  nextPath?: string;
};

const initialState: AuthActionState = { success: false, message: "" };

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form className="auth-form" action={action}>
      {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
      <Input label="Email" name="email" type="email" required autoComplete="email" />
      <Input label="Password" name="password" type="password" required autoComplete="current-password" />
      {state.message ? <p className="auth-message auth-message-error">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
      <p className="auth-hint">Demo: renter@spinwheels.in / spin123</p>
    </form>
  );
}
