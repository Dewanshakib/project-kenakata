// routes

import { Router } from "express";
import {
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  userSession,
} from "../controllers/user.Controller";
import { isValidated } from "../middlewares/auth";

const router = Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// session
router.get("/session", isValidated, userSession);

// logout
router.get("/logout", logout);

// forget password
router.post("/forget-password", forgetPassword)

// reset password
router.post("/reset-password", resetPassword)

export { router as userRoutes };
