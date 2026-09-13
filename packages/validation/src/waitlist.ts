import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Enter a valid phone number"),
  role: z.enum(["renter", "owner", "driver"]),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
