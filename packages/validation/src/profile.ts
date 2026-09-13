import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Enter a valid phone number"),
  city: z.string().trim().min(2, "City is required"),
});

export type ProfileInput = z.infer<typeof profileSchema>;
