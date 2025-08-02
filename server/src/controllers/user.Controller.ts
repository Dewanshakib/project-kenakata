// controllers
import { Request, Response } from "express";
import {
  EditAccountSchema,
  ForgetPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../libs/schema";
import { prisma } from "../libs/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import crypto from "crypto";
import { sendEmail } from "../services/mail";
import { generateContent } from "../utils/generateContent";
import cloudinary from "../libs/cloudinary";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

// register
export const register = async (req: Request, res: Response) => {
  try {
    const registerInput = req.body;

    const parsed = RegisterSchema.safeParse(registerInput);

    if (!parsed.success) {
      return res
        .status(400)
        .send({ message: parsed.error.flatten().fieldErrors });
    }

    const userExists = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (userExists) {
      return res
        .status(400)
        .send({ message: "User already exists. Try with another email" });
    }

    const hashPassword = await bcrypt.hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        username: parsed.data.username,
        email: parsed.data.email,
        password: hashPassword,
      },
    });

    return res.status(201).send({ message: "User registerd successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const loginInput = req.body;

    const parsed = LoginSchema.safeParse(loginInput);

    if (!parsed.success) {
      return res
        .status(400)
        .send({ message: parsed.error.flatten().fieldErrors });
    }

    const userExists = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (!userExists) {
      return res.status(400).send({ message: "User not found" });
    }

    if (userExists?.username !== parsed.data.username) {
      return res.status(400).send({ message: "Invalid username" });
    }

    const isMatched = await bcrypt.compare(
      parsed.data.password,
      userExists.password
    );
    if (!isMatched) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    // token
    const secret = generateToken(userExists.id);
    if (!secret) {
      return res.status(400).send({ message: "Invalid token" });
    }

    // cookie
    res.status(201).cookie("secret", secret, {
      maxAge: 3 * 24 * 3600 * 1000,
      priority: "high",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.status(201).send({ message: `Welcome back ${userExists.name}` });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// session
export const userSession = async (req: Request, res: Response) => {
  try {
    const id = req.id as string;

    const user = await prisma.user.findUnique({ where: { id } });
    // console.log(user)
    if (!user) {
      return res.status(400).send({ message: "User not found with this id" });
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      avater: user.avater,
      phone: user.phone,
    };

    return res.status(200).send({ user: userInfo });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie("secret");
    // res.cookie("secret","")

    return res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// forget password
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const parsed = ForgetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return res
        .status(400)
        .send({ message: parsed.error.flatten().fieldErrors });
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (!user) {
      return res.status(400).send({ message: "No user found with this email" });
    }

    // create token & expiry
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15min

    // send mail with token
    await sendEmail(user.email, resetPasswordToken);

    // update db
    await prisma.user.update({
      where: { email: user.email },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpiry: resetTokenExpiry,
      },
    });

    return res.status(201).send({ message: "Please check your email" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const parsed = ResetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return res
        .status(400)
        .send({ message: parsed.error.flatten().fieldErrors });
    }

    // check token valid or not
    const userWithToken = await prisma.user.findFirst({
      where: {
        resetPasswordToken: parsed.data.token,
        resetPasswordExpiry: { gt: new Date() },
      },
    });
    if (!userWithToken) {
      return res.status(400).send({ message: "Token expired or invalid." });
    }

    // new hashed password
    const newHashPassword = await bcrypt.hash(parsed.data.password, 10);

    // update db
    await prisma.user.update({
      where: { id: userWithToken.id },
      data: {
        resetPasswordExpiry: null,
        resetPasswordToken: null,
        password: newHashPassword,
      },
    });

    return res.status(201).send({ message: "Password changed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// edit user account
export const editAccount = async (req: Request, res: Response) => {
  try {
    // check authentication
    const id = req.id;
    if (!id) {
      return res.status(401).send({ message: "Not authorized" });
    }

    // check user
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // image file
    const imageFile = req.file;

    const body = req.body;
    // console.log("Body ------------------>",body)

    // zod validation server
    const { data, error, success } = EditAccountSchema.safeParse(body);
    if (!success) {
      return res.status(404).send({ message: error.flatten().fieldErrors });
    }

    // if any file exists or not
    if (imageFile) {
      // generate image content
      const imageContent = generateContent(
        imageFile?.buffer,
        imageFile?.originalname
      );

      // console.log(imageContent);

      const cloud = await cloudinary.uploader.upload(imageContent);
      // console.log(cloud);

      if (cloud.public_id !== user.avater_id) {
        if (user.avater_id) {
          await cloudinary.uploader.destroy(user.avater_id);
        }
      }

      if (cloud) {
        // console.log("Parsed Data ------------------->",data)
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            avater: cloud.secure_url,
            avater_id: cloud.public_id,
          },
        });
      } else {
        return res
          .status(404)
          .send({ message: "Error occured while uploading" });
      }
    }

    await prisma.user.update({
      where: { id },
      data: {
        name: data.name || user.name,
        username: data.username || user.username,
        email: data.email || user.email,
        phone: data.phone || user.phone,
      },
    });

    return res.status(201).send({ message: "Profile settings saved" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};
