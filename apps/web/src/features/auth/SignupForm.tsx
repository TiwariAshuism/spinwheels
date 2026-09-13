"use client";

import { useActionState } from "react";
import { Button, Input, Select } from "@spinwheels/ui";
import { signup, type AuthActionState } from "./actions";

const initialState: AuthActionState = { success: false, message: "" };

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <form className="auth-form" action={action}>
      <Input label="Full name" name="name" required autoComplete="name" />
      <Input label="Email" name="email" type="email" required autoComplete="email" />
      <Input label="Phone" name="phone" type="tel" required autoComplete="tel" />
      <Select label="I am a" name="role" required defaultValue="">
        <option value="" disabled>
          Select role
        </option>
        <option value="renter">Renter</option>
        <option value="owner">Owner</option>
        <option value="driver">Driver</option>
      </Select>
      <Input label="Password" name="password" type="password" required autoComplete="new-password" />
      {state.message ? <p className="auth-message auth-message-error">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
