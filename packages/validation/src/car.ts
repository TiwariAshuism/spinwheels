import { z } from "zod";

function emptyToUndefined(value: unknown) {
  if (value === "" || value === null || value === undefined) return undefined;
  return value;
}

function trimToUndefined(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export const carSearchSchema = z.object({
  location: z.preprocess(trimToUndefined, z.string().min(1).optional()),
  startDate: z.preprocess(trimToUndefined, z.string().min(1).optional()),
  endDate: z.preprocess(trimToUndefined, z.string().min(1).optional()),
  evOnly: z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) return undefined;
      return value === "true" || value === true;
    },
    z.boolean().optional(),
  ),
  maxPrice: z.preprocess(emptyToUndefined, z.coerce.number().positive().optional()),
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
