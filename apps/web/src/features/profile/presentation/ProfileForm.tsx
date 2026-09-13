"use client";

import { useActionState } from "react";
import type { SessionUser } from "@spinwheels/types";
import { Button, Input } from "@spinwheels/ui";
import { updateProfile, type ProfileActionState } from "../actions";

type ProfileFormProps = {
  user: SessionUser;
};

const initialState: ProfileActionState = { success: false, message: "" };

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, action, pending] = useActionState(updateProfile, initialState);

  return (
    <form className="auth-form" action={action}>
      <Input label="Full name" name="name" defaultValue={user.name} required />
      <Input label="Email" name="email" type="email" defaultValue={user.email} required />
      <Input label="Phone" name="phone" type="tel" defaultValue={user.phone} required />
      <Input label="City" name="city" defaultValue={user.city} required />
      {state.message ? (
        <p className={`auth-message${state.success ? "" : " auth-message-error"}`}>{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
