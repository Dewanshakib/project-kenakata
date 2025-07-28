// routes

import { Router } from "express";
import { login, register } from "../controllers/user.Controller";

const router = Router()

// register
router.post("/register",register)

// login
router.post("/login",login)


export {router as userRoutes}
