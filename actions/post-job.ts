import { z } from "zod";
import { JobStyle, JobType } from "@prisma/client";

const ApplicationSchema = z
  .object({
    applicationURL: z.string().url().optional().or(z.literal("")),
    applicationEmail: z.string().email().optional().or(z.literal("")),
  })
  .refine(
    ({ applicationURL, applicationEmail }) =>
      applicationURL || applicationEmail,
    {
      message:
        "Please provide either an email or a URL for application submissions.",
      path: ["applicationEmail"],
    },
  );

export const PostJobSchema = z
  .object({
    type: z.nativeEnum(JobType),
    companyId: z.string().min(1),
    style: z.nativeEnum(JobStyle),
    locationId: z.string().min(1),
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(5000),
    salary: z
      .string()
      .regex(/^\d+$/, "Must be a number.")
      .max(9, "Cannot be longer than 9 digits.")
      .optional()
      .or(z.literal("")),
  })
  .and(ApplicationSchema);

export type JobFieldsType = z.infer<typeof PostJobSchema>;
