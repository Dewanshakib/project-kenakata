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

export type RegisterInput = z.infer<typeof RegisterSchema>;

// login schema
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

export type LoginInput = z.infer<typeof LoginSchema>;

// forget password
export const ForgetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export type ForgetPasswordInput = z.infer<typeof ForgetPasswordSchema>;

// reset password
export const ResetPasswordSchema = z.object({
  token: z.string().refine((token) => token.trim() !== "", {
    message: "Please enter your token",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 Characters" })
    .max(60, { message: "Password must be under 60 Characters" }),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

// edit-account schema
export const EditAccountSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 Characters" })
    .max(50, { message: "Name must be under 50 Characters" }),
  username: z
    .string()
    .min(5, { message: "Name must be at least 5 Characters" })
    .max(50, { message: "Name must be under 50 Characters" }),
  email: z
    .string()
    .min(5, { message: "Name must be at least 5 Characters" })
    .max(50, { message: "Name must be under 50 Characters" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || (/^01\d{9}$/.test(val) && val.length === 11), {
      message: "Phone number must be 11 digits and start with '01'",
    }),
});

export type EditAccountInput = z.infer<typeof EditAccountSchema>;

// add account address schema
export const AddAccountAddressSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 Characters" })
    .max(50, { message: "Name must be under 50 Characters" }),
  address: z
    .string()
    .refine((address) => address.trim() !== "", { message: "Please enter your address" }),
  state: z
    .string()
    .refine((address) => address.trim() !== "", { message: "Please enter your state" }),
  country: z
    .string()
    .refine((address) => address.trim() !== "", { message: "Please enter your country" }),
  city: z
    .string()
    .refine((address) => address.trim() !== "", { message: "Please enter your city" })
});

export type AddAccountAddressInput = z.infer<typeof AddAccountAddressSchema>