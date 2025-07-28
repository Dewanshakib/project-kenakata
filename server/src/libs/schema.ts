import * as z from "zod";

// register schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please type your name" })
    .min(5, { message: "Name must be at least 5 Characters" }),
  username: z
    .string()
    .min(1, { message: "Please type your Username" })
    .min(5, { message: "Username must be at least 5 Characters" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Please type your email" }),
  password: z
    .string()
    .min(1, { message: "Please type your password" })
    .min(5, { message: "Password must be at least 5 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});

// register schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please type your Username" })
    .min(5, { message: "Username must be at least 5 Characters" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Please type your email" }),
  password: z
    .string()
    .min(1, { message: "Please type your password" })
    .min(5, { message: "Password must be at least 5 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});
