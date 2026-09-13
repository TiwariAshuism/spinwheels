"use client";

import { useActionState } from "react";
import { Button } from "@spinwheels/ui";
import { joinWaitlist, type WaitlistActionState } from "./actions";

const initialState: WaitlistActionState = {
  success: false,
  message: "",
};

type WaitlistRole = "renter" | "owner" | "driver";

type WaitlistFormProps = {
  defaultRole?: WaitlistRole;
  hideRoleSelect?: boolean;
  submitLabel?: string;
  pendingLabel?: string;
  className?: string;
  noteClassName?: string;
};

export function WaitlistForm({
  defaultRole,
  hideRoleSelect = false,
  submitLabel = "Join the waitlist",
  pendingLabel = "Joining...",
  className = "",
  noteClassName = "waitlist-note",
}: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const formClassName = ["waitlist-form", className].filter(Boolean).join(" ");

  return (
    <>
      <form className={formClassName} action={formAction}>
        <div className="waitlist-form-fields">
          <input type="text" name="name" placeholder="Full name" required autoComplete="name" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            required
            autoComplete="tel"
          />
          {hideRoleSelect && defaultRole ? (
            <input type="hidden" name="role" value={defaultRole} />
          ) : (
            <select name="role" required defaultValue={defaultRole ?? ""}>
              <option value="" disabled>
                I am a...
              </option>
              <option value="renter">Renter — I want to book a car</option>
              <option value="owner">Owner — I want to list my car</option>
              <option value="driver">Driver — I want to drive a cab (coming soon)</option>
            </select>
          )}
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? pendingLabel : submitLabel}
        </Button>
      </form>
      {state.message ? (
        <p className={noteClassName}>{state.message}</p>
      ) : (
        <p className={noteClassName} aria-hidden="true" />
      )}
    </>
  );
}
