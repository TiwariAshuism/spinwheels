"use client";

import { useActionState } from "react";
import { Button } from "@spinwheels/ui";
import { joinWaitlist, type WaitlistActionState } from "./actions";

const initialState: WaitlistActionState = {
  success: false,
  message: "",
};

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  return (
    <>
      <form className="waitlist-form" action={formAction}>
        <input type="text" name="name" placeholder="Full name" required />
        <input type="tel" name="phone" placeholder="Phone number" required />
        <select name="role" required defaultValue="">
          <option value="" disabled>
            I am a...
          </option>
          <option value="renter">Renter — I want to book a car</option>
          <option value="owner">Owner — I want to list my car</option>
          <option value="driver">Driver — I want to drive a cab (coming soon)</option>
        </select>
        <Button type="submit" disabled={pending}>
          {pending ? "Joining..." : "Join the waitlist"}
        </Button>
      </form>
      {state.message ? <p className="waitlist-note">{state.message}</p> : <p className="waitlist-note" />}
    </>
  );
}
