"use client";

import { useActionState } from "react";
import { Button, Input, Select } from "@spinwheels/ui";
import { updateVerification, type AdminActionState } from "../actions";

type VerificationFormProps = {
  userId: string;
  documentType: "license" | "registration" | "insurance";
  documentNumber: string;
};

const initialState: AdminActionState = { success: false, message: "" };

export function VerificationForm({ userId, documentType, documentNumber }: VerificationFormProps) {
  const [state, action, pending] = useActionState(updateVerification, initialState);

  return (
    <form className="auth-form" action={action}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="documentType" value={documentType} />
      <input type="hidden" name="documentNumber" value={documentNumber} />
      <Select label="Decision" name="status" required defaultValue="">
        <option value="" disabled>
          Select status
        </option>
        <option value="approved">Approve</option>
        <option value="rejected">Reject</option>
        <option value="pending">Keep pending</option>
      </Select>
      <Input label="Note" name="note" />
      {state.message ? (
        <p className={`auth-message${state.success ? "" : " auth-message-error"}`}>{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Updating..." : "Update verification"}
      </Button>
    </form>
  );
}
