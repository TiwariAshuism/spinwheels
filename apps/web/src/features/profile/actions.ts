"use server";

import { profileSchema } from "@spinwheels/validation";
import { requireSession } from "@/lib/auth/require-session";
import { setSession } from "@/lib/auth/session";

export type ProfileActionState = {
  success: boolean;
  message: string;
};

export async function updateProfile(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const session = await requireSession();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check profile details",
    };
  }

  await setSession({ ...session, ...parsed.data });
  return { success: true, message: "Profile updated" };
}
