import { z } from "zod";

export const carSearchSchema = z.object({
  location: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  evOnly: z.coerce.boolean().optional(),
  maxPrice: z.coerce.number().positive().optional(),
});

export const carSchema = z.object({
  make: z.string().trim().min(1, "Make is required"),
  model: z.string().trim().min(1, "Model is required"),
  year: z.coerce.number().int().min(2010).max(new Date().getFullYear() + 1),
  pricePerDay: z.coerce.number().positive("Price must be positive"),
  location: z.string().trim().min(2, "Location is required"),
  registration: z.string().trim().min(4, "Registration is required"),
  ev: z.coerce.boolean(),
});

export type CarSearchInput = z.infer<typeof carSearchSchema>;
export type CarInput = z.infer<typeof carSchema>;
