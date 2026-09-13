"use server";

import { waitlistSchema } from "@spinwheels/validation";

export type WaitlistActionState = {
  success: boolean;
  message: string;
};

export async function joinWaitlist(
  _prevState: WaitlistActionState,
  formData: FormData,
): Promise<WaitlistActionState> {
  const parsed = waitlistSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Please check your details",
    };
  }

  const firstName = parsed.data.name.split(" ")[0];
  return {
    success: true,
    message: `Thanks${firstName ? `, ${firstName}` : ""} — you're on the list. We'll be in touch soon.`,
  };
}
