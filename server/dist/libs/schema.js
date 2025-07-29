"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const z = __importStar(require("zod"));
// register schema
exports.registerSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Please type your name" })
        .min(5, { message: "Name must be at least 5 Characters" }),
    username: z
        .string()
        .min(1, { message: "Please type your Username" })
        .min(5, { message: "Username must be at least 5 Characters" }),
    email: z
        .email({ message: "Invalid email address" })
        .min(1, { message: "Please type your email" }),
    password: z
        .string()
        .min(1, { message: "Please type your password" })
        .min(6, { message: "Password must be at least 6 Characters" })
        .max(60, { message: "Password must be under 60 Characters" }),
});
// register schema
exports.loginSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Please type your Username" })
        .min(5, { message: "Username must be at least 5 Characters" }),
    email: z
        .email({ message: "Invalid email address" })
        .min(1, { message: "Please type your email" }),
    password: z
        .string()
        .min(1, { message: "Please type your password" })
        .min(6, { message: "Password must be at least 6 Characters" })
        .max(60, { message: "Password must be under 60 Characters" }),
});
