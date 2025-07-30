import * as z from "zod";

// register schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter your name" })
    .min(5, { message: "Name must be at least 5 Characters" }),
  username: z
    .string()
    .min(1, { message: "Please enter your Username" })
    .min(5, { message: "Username must be at least 5 Characters" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Please enter your email" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});

// register schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please enter your Username" })
    .min(5, { message: "Username must be at least 5 Characters" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Please enter your email" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});

// forget password schema
export const forgetPasswordSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Please enter your email" }),
})

// reset password schema
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, { message: "Please enter your token" }),
  password: z
    .string()
    .min(1, { message: "Please enter your new password" })
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
})