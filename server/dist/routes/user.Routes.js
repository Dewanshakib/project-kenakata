"use strict";
// routes
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_Controller_1 = require("../controllers/user.Controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
exports.userRoutes = router;
// register
router.post("/register", user_Controller_1.register);
// login
router.post("/login", user_Controller_1.login);
// session
router.get("/session", auth_1.isValidated, user_Controller_1.userSession);
// logout
router.post("/logout", user_Controller_1.logout);
