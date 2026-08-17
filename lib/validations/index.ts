import {
  CommitteeRole,
  CommitteeType,
  ConflictStatus,
  Gender,
  InterviewStatus,
  LivestockType,
  ProjectStatus,
  ProjectType,
  SchoolStatus,
  SettlementType,
  UserRole,
  Zone
} from "@prisma/client";
import { z } from "zod";

const id = z.string().cuid();
const optionalId = z
  .union([id, z.literal(""), z.null(), z.undefined()])
  .transform((value): string | null =>
    value === "" || value == null ? null : value
  );

const optionalDate = z
  .string()
  .optional()
  .nullable()
  .transform((value): Date | null => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  });
const requiredText = z.string().trim().min(1).max(500);
const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number")
  .optional()
  .or(z.literal(""));
const nonNegativeInteger = z.coerce.number().int().min(0);
const money = z.coerce.number().finite().min(0).optional().nullable();

export const lgaSchema = z.object({
  name: requiredText.max(100),
  zone: z.nativeEnum(Zone)
});

export const livestockSchema = z.object({
  householdId: id,
  type: z.nativeEnum(LivestockType),
  count: nonNegativeInteger
});

export const householdSchema = z.object({
  lgaId: id,
  ward: requiredText.max(150),
  communityName: requiredText.max(200),
  headName: requiredText.max(200),
  headAge: z.coerce.number().int().min(18).max(130),
  headGender: z.nativeEnum(Gender),
  phone,
  nin: z
    .string()
    .trim()
    .regex(/^[0-9]{11}$/, "NIN must contain exactly 11 digits")
    .optional()
    .or(z.literal("")),
  gpsCoordinates: z
    .string()
    .trim()
    .regex(
      /^-?(?:90(?:\.0+)?|[0-8]?\d(?:\.\d+)?),\s*-?(?:180(?:\.0+)?|(?:1[0-7]\d|[0-9]?\d)(?:\.\d+)?)$/,
      "Use latitude,longitude format"
    ),
  settlementType: z.nativeEnum(SettlementType),
  interviewStatus: z.nativeEnum(InterviewStatus),
  enumeratorId: id,
  supervisorId: id.optional().nullable(),
  livestock: z
    .array(livestockSchema.omit({ householdId: true }))
    .max(20)
    .optional()
});

export const householdUpdateSchema = householdSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const nomadicSchoolSchema = z.object({
  name: requiredText.max(250),
  lgaId: id,
  location: requiredText,
  status: z.nativeEnum(SchoolStatus).default(SchoolStatus.NOT_ASSESSED),
  teacherCountMale: nonNegativeInteger,
  teacherCountFemale: nonNegativeInteger,
  studentEnrollmentMale: nonNegativeInteger,
  studentEnrollmentFemale: nonNegativeInteger,
  classroomGood: nonNegativeInteger,
  classroomBad: nonNegativeInteger,
  hasSolar: z.coerce.boolean(),
  hasBorehole: z.coerce.boolean(),
  lastInspectionDate: z.coerce.date().optional().nullable()
});

export const nomadicSchoolUpdateSchema = nomadicSchoolSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const conflictCaseSchema = z.object({
  title: requiredText.max(250),
  description: requiredText.max(10_000),
  lgaId: id,
  location: requiredText.max(500),
  dateReported: z.coerce.date().max(new Date()),
  status: z.nativeEnum(ConflictStatus).default(ConflictStatus.PENDING),
  rootCause: z.string().trim().max(5_000).optional().nullable(),
  compensationAmount: money,
  partiesInvolved: z
    .array(
      z.object({
        name: requiredText.max(200),
        type: requiredText.max(100),
        phone
      })
    )
    .min(2)
    .max(100)
});

export const resolveConflictSchema = z.object({
  resolutionDetails: requiredText.max(10_000),
  compensationAmount: money,
  status: z
    .enum([ConflictStatus.RESOLVED, ConflictStatus.ESCALATED])
    .default(ConflictStatus.RESOLVED)
});

export const committeeMemberSchema = z.object({
  name: requiredText.max(200),
  phone,
  lgaId: id,
  role: z.nativeEnum(CommitteeRole),
  committeeType: z.nativeEnum(CommitteeType),
  isActive: z.boolean().default(true)
});

export const committeeMemberUpdateSchema = committeeMemberSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, "At least one field is required");

export const userSchema = z.object({
  name: requiredText.max(200),
  email: z.string().trim().email().max(320).transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(128),
  role: z.nativeEnum(UserRole),
  department: z.string().trim().max(200).optional().nullable(),
  phone,
  lgaId: optionalId,
  isActive: z.boolean().default(true)
});

export const userUpdateSchema = z
  .object({
    name: requiredText.max(200).optional(),
    email: z
      .string()
      .trim()
      .email()
      .max(320)
      .transform((value) => value.toLowerCase())
      .optional(),
    password: z.string().min(12).max(128).optional().or(z.literal("")),
    role: z.nativeEnum(UserRole).optional(),
    department: z.string().trim().max(200).optional().nullable(),
    phone,
    lgaId: optionalId,
    isActive: z.boolean().optional()
  })
  .refine((value) => Object.keys(value).length > 0, "At least one field is required");

export const householdFormSchema = householdSchema
  .omit({ enumeratorId: true, livestock: true })
  .extend({
    cattle: z.coerce.number().int().min(0),
    sheep: z.coerce.number().int().min(0),
    goat: z.coerce.number().int().min(0),
    camel: z.coerce.number().int().min(0),
    chicken: z.coerce.number().int().min(0),
    other: z.coerce.number().int().min(0)
  });

export const auditLogSchema = z.object({
  userId: id,
  action: requiredText.max(100),
  entityType: requiredText.max(100),
  entityId: id.optional().nullable(),
  changes: z.record(z.unknown()).optional().nullable(),
  ipAddress: z.string().ip().optional().nullable()
});

const projectFields = z.object({
  title: requiredText.max(250),
  description: requiredText.max(10_000),
  lgaId: id,
  type: z.nativeEnum(ProjectType),
  budget: money,
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.PLANNING),
  startDate: optionalDate,
  endDate: optionalDate,
  impactReport: z.string().trim().max(20_000).optional().nullable()
});

export const projectSchema = projectFields.refine(
  ({ startDate, endDate }) =>
    !startDate || !endDate || endDate.getTime() >= startDate.getTime(),
  { message: "End date cannot precede start date", path: ["endDate"] }
);

export const projectUpdateSchema = projectFields.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const projectStatusSchema = z.object({
  status: z.nativeEnum(ProjectStatus)
});

export { loginSchema } from "./auth";

export const idSchema = id;
