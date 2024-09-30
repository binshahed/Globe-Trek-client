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

export const registerValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required"
    })
    .trim(),
  email: z
    .string({
      required_error: "Email is required"
    })
    .email("Please enter valid your email")
    .trim(),
  mobileNumber: z
    .string({
      required_error: "Mobile Number is required"
    })
    .trim(),
  password: z
    .string({
      required_error: "Password is required"
    })
    .trim()
    .min(6, "Password must be at least 6 characters")
});
