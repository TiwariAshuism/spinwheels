import { z } from "zod";

export const createBookingSchema = z.object({
  carId: z.string().trim().min(1),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().min(1, "End date is required"),
  addDriver: z.coerce.boolean().optional(),
  pickupNote: z.string().trim().max(500).optional(),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().trim().min(1),
  reason: z.string().trim().min(3, "Provide a cancellation reason"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
