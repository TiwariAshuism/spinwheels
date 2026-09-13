"use client";

import { useActionState } from "react";
import { Button, Input, Select } from "@spinwheels/ui";
import { createCar, type CarActionState } from "../actions";

const initialState: CarActionState = { success: false, message: "" };

export function CreateCarForm() {
  const [state, action, pending] = useActionState(createCar, initialState);

  return (
    <form className="auth-form" action={action}>
      <Input label="Make" name="make" required />
      <Input label="Model" name="model" required />
      <Input label="Year" name="year" type="number" required />
      <Input label="Price per day (₹)" name="pricePerDay" type="number" required />
      <Input label="Location" name="location" required />
      <Input label="Registration" name="registration" required />
      <Select label="Fuel type" name="ev" defaultValue="false">
        <option value="false">Petrol / Diesel</option>
        <option value="true">Electric</option>
      </Select>
      {state.message ? (
        <p className={`auth-message${state.success ? "" : " auth-message-error"}`}>{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Listing..." : "List car"}
      </Button>
    </form>
  );
}
