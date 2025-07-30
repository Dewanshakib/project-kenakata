"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.logout = exports.userSession = exports.login = exports.register = void 0;
const schema_1 = require("../libs/schema");
const prisma_1 = require("../libs/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const crypto_1 = __importDefault(require("crypto"));
const mail_1 = require("../services/mail");
// register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerInput = req.body;
        const parsed = schema_1.registerSchema.safeParse(registerInput);
        if (!parsed.success) {
            return res
                .status(400)
                .send({ error: parsed.error.flatten().fieldErrors });
        }
        const userExists = yield prisma_1.prisma.user.findUnique({
            where: { email: parsed.data.email },
        });
        if (userExists) {
            return res
                .status(401)
                .send({ message: "User already exists. Try with another email" });
        }
        const hashPassword = yield bcryptjs_1.default.hash(parsed.data.password, 10);
        yield prisma_1.prisma.user.create({
            data: {
                name: parsed.data.name,
                username: parsed.data.username,
                email: parsed.data.email,
                password: hashPassword,
            },
        });
        return res.status(201).send({ message: "User registerd successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        return res.status(500).send({ message: "Server error" });
    }
});
exports.register = register;
// login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInput = req.body;
        const parsed = schema_1.loginSchema.safeParse(loginInput);
        if (!parsed.success) {
            return res
                .status(400)
                .send({ error: parsed.error.flatten().fieldErrors });
        }
        const userExists = yield prisma_1.prisma.user.findUnique({
            where: { email: parsed.data.email },
        });
        if (!userExists) {
            return res.status(401).send({ message: "User not found" });
        }
        const isMatched = yield bcryptjs_1.default.compare(parsed.data.password, userExists.password);
        if (!isMatched) {
            return res.status(401).send({ message: "Invalid Credentials" });
        }
        // token
        const secret = (0, generateToken_1.generateToken)(userExists.id);
        if (!secret) {
            return res.status(401).send({ message: "Invalid token" });
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        return res.status(500).send({ message: "Server error" });
    }
});
exports.login = login;
// session
const userSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.id;
        const user = yield prisma_1.prisma.user.findFirst({ where: { id } });
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        return res.status(500).send({ message: "Server error" });
    }
});
exports.userSession = userSession;
// logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).clearCookie("secret");
        // res.cookie("secret","")
        return res.status(200).send({ message: "User logged out successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        return res.status(500).send({ message: "Server error" });
    }
});
exports.logout = logout;
// forget password
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const parsed = schema_1.forgetPasswordSchema.safeParse(body);
        if (!parsed.success) {
            return res.status(400).send({ error: parsed.error.flatten().fieldErrors });
        }
        const user = yield prisma_1.prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user) {
            return res.status(401).send({ message: "No user found with this email" });
        }
        // create token & expiry
        const resetPasswordToken = crypto_1.default.randomBytes(32).toString("hex");
        const resetTokenExpiry = (new Date(Date.now() + (15 * 60 * 1000))); // 15min 
        // send mail with token
        yield (0, mail_1.sendEmail)(user.email, resetPasswordToken);
        // update db
        yield prisma_1.prisma.user.update({
            where: { email: user.email }, data: {
                resetPasswordToken: resetPasswordToken,
                resetPasswordExpiry: resetTokenExpiry
            }
        });
        return res.status(201).send({ message: "Please check your email" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        return res.status(500).send({ message: "Server error" });
    }
});
exports.forgetPassword = forgetPassword;
// reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const parsed = schema_1.resetPasswordSchema.safeParse(body);
        if (!parsed.success) {
            return res.status(400).send({ error: parsed.error.flatten().fieldErrors });
        }
        // check token valid or not
        const userWithToken = yield prisma_1.prisma.user.findFirst({
            where: {
                resetPasswordToken: parsed.data.token,
                resetPasswordExpiry: { gt: new Date() }
            }
        });
        if (!userWithToken) {
            return res.status(401).send({ message: "Token expired or invalid." });
        }
        // new hashed password
        const newHashPassword = yield bcryptjs_1.default.hash(parsed.data.password, 10);
        // update db
        yield prisma_1.prisma.user.update({
            where: { id: userWithToken.id }, data: {
                resetPasswordExpiry: null,
                resetPasswordToken: null,
                password: newHashPassword
            }
        });
        return res.status(201).send({ message: "Password changed successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        return res.status(500).send({ message: "Server error" });
    }
});
exports.resetPassword = resetPassword;
