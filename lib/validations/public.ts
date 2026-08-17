import { z } from "zod";

const phoneLoose = z
  .string()
  .trim()
  .max(20)
  .refine(
    (value) => value === "" || /^[+0-9][0-9\s-]{8,18}$/.test(value),
    "Enter a valid phone number"
  );

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  phone: phoneLoose.optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000)
});

export const publicConflictSchema = z.object({
  lgaName: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(500),
  description: z.string().trim().min(20).max(5000),
  contactName: z.string().trim().min(2).max(200),
  contactPhone: z
    .string()
    .trim()
    .min(10)
    .max(20)
    .refine((value) => /^[+0-9][0-9\s-]{8,18}$/.test(value), "Enter a valid phone number"),
  contactEmail: z.string().trim().email().max(320).optional().or(z.literal(""))
});
