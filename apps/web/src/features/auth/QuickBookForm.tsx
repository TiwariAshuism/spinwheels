"use client";

import { useActionState } from "react";
import { Button, Input } from "@spinwheels/ui";
import { quickBookAuth, type AuthActionState } from "./actions";

type QuickBookFormProps = {
  carId: string;
  startDate: string;
  endDate: string;
  pickupNote?: string;
};

const initialState: AuthActionState = { success: false, message: "" };

export function QuickBookForm({ carId, startDate, endDate, pickupNote }: QuickBookFormProps) {
  const [state, action, pending] = useActionState(quickBookAuth, initialState);

  return (
    <form className="auth-form" action={action}>
      <input type="hidden" name="carId" value={carId} />
      <input type="hidden" name="startDate" value={startDate} />
      <input type="hidden" name="endDate" value={endDate} />
      {pickupNote ? <input type="hidden" name="pickupNote" value={pickupNote} /> : null}
      <Input label="Full name" name="name" required autoComplete="name" />
      <Input label="Phone" name="phone" type="tel" required autoComplete="tel" />
      <Input label="Email" name="email" type="email" required autoComplete="email" />
      {state.message ? <p className="auth-message auth-message-error">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Continuing..." : "Continue to book"}
      </Button>
      <p className="auth-hint">Only name, phone, and email needed to confirm your booking.</p>
    </form>
  );
}
