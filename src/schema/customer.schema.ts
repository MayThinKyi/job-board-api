import { z } from "zod";

const addCustomerSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, {
    message:
      "Phone number must be a valid international number (e.g. +1234567890)",
  }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" }),
});

const updateCustomerSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .optional(),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, {
      message:
        "Phone number must be a valid international number (e.g. +1234567890)",
    })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" })
    .optional(),
});

export { addCustomerSchema, updateCustomerSchema };
