"use server";

import { resolveDisputeSchema, verificationSchema } from "@spinwheels/validation";
import { requireSession } from "@/lib/auth/require-session";

export type AdminActionState = {
  success: boolean;
  message: string;
};

export async function resolveDispute(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireSession(["admin"]);

  const parsed = resolveDisputeSchema.safeParse({
    disputeId: formData.get("disputeId"),
    resolution: formData.get("resolution"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check resolution details",
    };
  }

  return { success: true, message: "Dispute marked as resolved" };
}

export async function updateVerification(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireSession(["admin"]);

  const parsed = verificationSchema.safeParse({
    userId: formData.get("userId"),
    documentType: formData.get("documentType"),
    documentNumber: formData.get("documentNumber"),
    status: formData.get("status"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Check verification details",
    };
  }

  return { success: true, message: `Verification ${parsed.data.status}` };
}
