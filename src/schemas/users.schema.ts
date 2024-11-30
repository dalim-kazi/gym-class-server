import { z } from 'zod';

// Define Zod schema for user validation
export const userValidationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(['admin', 'trainer', 'trainee']).optional(),
});

// Define validation for login (password and email only)
export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
