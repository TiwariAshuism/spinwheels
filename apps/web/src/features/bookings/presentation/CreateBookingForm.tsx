"use client";

import { useActionState } from "react";
import { Button, Input } from "@spinwheels/ui";
import { createBooking, type BookingActionState } from "../actions";

type CreateBookingFormProps = {
  carId: string;
  defaults?: {
    startDate?: string;
    endDate?: string;
    pickupNote?: string;
  };
};

const initialState: BookingActionState = { success: false, message: "" };

export function CreateBookingForm({ carId, defaults }: CreateBookingFormProps) {
  const [state, action, pending] = useActionState(createBooking, initialState);

  return (
    <form className="auth-form" action={action}>
      <input type="hidden" name="carId" value={carId} />
      <Input label="Start date" name="startDate" type="date" required defaultValue={defaults?.startDate} />
      <Input label="End date" name="endDate" type="date" required defaultValue={defaults?.endDate} />
      <Input
        label="Pickup note"
        name="pickupNote"
        placeholder="Near Forum Mall entrance"
        defaultValue={defaults?.pickupNote}
      />
      {state.message ? (
        <p className={`auth-message${state.success ? "" : " auth-message-error"}`}>{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Booking..." : "Confirm booking"}
      </Button>
    </form>
  );
}
