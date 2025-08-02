import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "3d",
  });
};
