import { z } from "zod";

export const verificationSchema = z.object({
  userId: z.string().trim().min(1),
  documentType: z.enum(["license", "registration", "insurance"]),
  documentNumber: z.string().trim().min(4, "Document number is required"),
  status: z.enum(["pending", "approved", "rejected"]),
  note: z.string().trim().max(500).optional(),
});

export type VerificationInput = z.infer<typeof verificationSchema>;
