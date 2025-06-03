import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(50, { message: "Category name must be at most 50 characters" }),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name cannot be empty" })
    .max(50, { message: "Category name must be at most 50 characters" })
    .optional(),
});

export { createCategorySchema, updateCategorySchema };
