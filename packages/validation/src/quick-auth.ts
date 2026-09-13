import { z } from "zod";

export const quickBookSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email"),
  carId: z.string().trim().min(1),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().min(1, "End date is required"),
  pickupNote: z.string().trim().max(500).optional(),
});

export type QuickBookInput = z.infer<typeof quickBookSchema>;
