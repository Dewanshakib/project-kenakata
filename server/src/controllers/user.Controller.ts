// controllers
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../libs/schema";
import { prisma } from "../libs/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

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

    const parsed = registerSchema.safeParse(registerInput);

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

    const parsed = loginSchema.safeParse(loginInput);

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
      sameSite: "strict",
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

    const user = await prisma.user.findFirst({ where: { id } });
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
    // clear cookie
    res.status(200).clearCookie("secret");

    return res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};
