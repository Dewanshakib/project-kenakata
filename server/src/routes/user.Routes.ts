// user routes

import { Router } from "express";

import { isValidated } from "../middlewares/auth";
import { upload } from "../middlewares/multer";
import { editAccount,  forgetPassword, login, logout, register, resetPassword, userSession } from "../controllers/user.controller";

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
router.post("/forget-password", forgetPassword);

// reset password
router.post("/reset-password", resetPassword);

// edit user profile
router.post("/edit-account", upload, isValidated, editAccount);

export { router as userRoutes };
