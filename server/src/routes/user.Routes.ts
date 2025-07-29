// routes

import { Router } from "express";
import {
  login,
  logout,
  register,
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
router.post("/logout", logout);

export { router as userRoutes };
