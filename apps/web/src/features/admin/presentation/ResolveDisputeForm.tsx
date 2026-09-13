"use client";

import { useActionState } from "react";
import { Button, Input, Select } from "@spinwheels/ui";
import { resolveDispute, type AdminActionState } from "../actions";

type ResolveDisputeFormProps = {
  disputeId: string;
};

const initialState: AdminActionState = { success: false, message: "" };

export function ResolveDisputeForm({ disputeId }: ResolveDisputeFormProps) {
  const [state, action, pending] = useActionState(resolveDispute, initialState);

  return (
    <form className="auth-form" action={action}>
      <input type="hidden" name="disputeId" value={disputeId} />
      <Select label="Resolution" name="resolution" required defaultValue="">
        <option value="" disabled>
          Select outcome
        </option>
        <option value="renter">Favor renter</option>
        <option value="owner">Favor owner</option>
        <option value="split">Split liability</option>
      </Select>
      <Input label="Resolution note" name="note" required />
      {state.message ? (
        <p className={`auth-message${state.success ? "" : " auth-message-error"}`}>{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Resolve dispute"}
      </Button>
    </form>
  );
}
