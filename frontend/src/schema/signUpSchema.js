import {z} from "zod"

export const signUp = z.object({
    firstName: z.string().trim().min(1, "First Name is required"),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    otp: z.string().trim().min(6, "OTP must be 6 characters"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Confirm password must be at least 8 characters")
      ,
    city: z.string().trim().min(2, "City is Required"),
    state: z.string().trim().min(2, "State is Required"),
    country: z.string().trim().min(2, "Country is Required"),
  });
  