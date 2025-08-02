import * as z from "zod";

// register schema
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 Characters" })
    .max(50, { message: "Name must be under 50 Characters" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 Characters" })
    .max(50, { message: "Username must be under 50 Characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});

// register schema
export const LoginSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 Characters" })
    .max(50, { message: "Username must be under 50 Characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});

// forget password schema
export const FPSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

// reset password schema
export const RPSchema = z.object({
  token: z.string().refine((token) => token.trim() !== "", {
    message: "Please enter your token",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});