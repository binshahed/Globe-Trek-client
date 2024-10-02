import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required"
    })
    .email("Please enter valid your email")
    .trim(),
  password: z
    .string({
      required_error: "Password is required"
    })
    .trim()
    .min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required")
});
