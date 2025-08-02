import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isValidated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.secret;
    // console.log(token)
    if (!token) {
      return res.status(400).send({ message: "Invalid token" });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as jwt.JwtPayload;

    if (!payload) {
      return res.status(400).send({ message: "Unauthorized" });
    }

    req.id = payload.id;
    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Server error" });
  }
};
