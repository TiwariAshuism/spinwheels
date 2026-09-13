"use server";

import { redirect } from "next/navigation";
import { createBookingSchema } from "@spinwheels/validation";
import { requireSession } from "@/lib/auth/require-session";
import { getCarById } from "@/lib/data";

export type BookingActionState = {
  success: boolean;
  message: string;
};

export async function createBooking(
  _prev: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const session = await requireSession(["renter"]);

  const parsed = createBookingSchema.safeParse({
    carId: formData.get("carId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    addDriver: formData.get("addDriver"),
    pickupNote: formData.get("pickupNote"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check booking details",
    };
  }

  const car = getCarById(parsed.data.carId);
  if (!car) {
    return { success: false, message: "Car not found" };
  }

  redirect("/booking/booking-1");
}
