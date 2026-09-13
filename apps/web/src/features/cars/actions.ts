"use server";

import { redirect } from "next/navigation";
import { carSchema } from "@spinwheels/validation";
import { requireSession } from "@/lib/auth/require-session";

export type CarActionState = {
  success: boolean;
  message: string;
};

export async function createCar(
  _prev: CarActionState,
  formData: FormData,
): Promise<CarActionState> {
  await requireSession(["owner"]);

  const parsed = carSchema.safeParse({
    make: formData.get("make"),
    model: formData.get("model"),
    year: formData.get("year"),
    pricePerDay: formData.get("pricePerDay"),
    location: formData.get("location"),
    registration: formData.get("registration"),
    ev: formData.get("ev"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check car details",
    };
  }

  redirect("/owner/cars");
}
