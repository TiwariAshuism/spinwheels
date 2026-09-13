import { z } from "zod";

export const disputeSchema = z.object({
  bookingId: z.string().trim().min(1),
  description: z.string().trim().min(10, "Describe the issue in detail"),
  evidenceUrl: z.string().trim().url("Provide a valid evidence URL").optional().or(z.literal("")),
});

export const resolveDisputeSchema = z.object({
  disputeId: z.string().trim().min(1),
  resolution: z.enum(["renter", "owner", "split"]),
  note: z.string().trim().min(5, "Add a resolution note"),
});

export type DisputeInput = z.infer<typeof disputeSchema>;
export type ResolveDisputeInput = z.infer<typeof resolveDisputeSchema>;
