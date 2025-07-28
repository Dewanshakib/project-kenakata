// controllers

import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../libs/schema";
import { prisma } from "../libs/prisma";
import bcrypt from "bcryptjs";

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

    // cookie

    return res.status(201).send({ message: `Welcome back ${userExists.name}` });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

// logout