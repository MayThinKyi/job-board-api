import { z } from "zod";

const createJobSchema = z
  .object({
    title: z.string(),
    jobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"]),
    experience: z.enum(["INTERN", "JUNIOR", "MID", "SENIOR", "EXECUTIVE"]),
    category: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId"),
    status: z.enum(["OPEN", "CLOSED"]).optional().default("OPEN"),
    location: z.string(),
    info: z.string(),
    description: z.array(z.string()).min(1),
    qualifications: z.array(z.string()).min(1),
    benefits: z.array(z.string()).min(1),
    isNegotiable: z.boolean(),
    salaryFrom: z.number().optional(),
    salaryTo: z.number().optional(),
  })
  .refine(
    (data) =>
      data.isNegotiable ||
      (data.salaryFrom !== undefined && data.salaryTo !== undefined),
    {
      message:
        "Both salaryFrom and salaryTo are required when the job is not negotiable.",
      path: ["salaryFrom", "salaryTo"],
    },
  );

const updateJobSchema = z
  .object({
    title: z.string().optional(),
    jobType: z
      .enum(["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"])
      .optional(),
    experience: z
      .enum(["INTERN", "JUNIOR", "MID", "SENIOR", "EXECUTIVE"])
      .optional(),
    category: z
      .string()
      .regex(/^[a-f\d]{24}$/i, "Invalid ObjectId")
      .optional(),
    status: z.enum(["OPEN", "CLOSED"]).optional(),
    location: z.string().optional(),
    info: z.string().optional(),
    description: z.array(z.string()).optional(),
    qualifications: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    isNegotiable: z.boolean().optional(),
    salaryFrom: z.number().optional(),
    salaryTo: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.isNegotiable === undefined) return true;
      if (!data.isNegotiable) {
        return data.salaryFrom !== undefined && data.salaryTo !== undefined;
      }
      return true;
    },
    {
      message:
        "Both salaryFrom and salaryTo are required when the job is not negotiable.",
      path: ["salaryFrom", "salaryTo"],
    },
  );

export { createJobSchema, updateJobSchema };
