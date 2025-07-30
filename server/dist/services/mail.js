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
exports.transpoter = void 0;
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transpoter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
    },
});
function sendEmail(to, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.transpoter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject: "Reset Password",
            html: `<div style="max-width: 500px; margin: auto; font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #2c3e50; text-align: center;">🔐 Password Reset Request</h2>

        <p style="font-size: 16px; color: #333;">
        You requested a password reset. Use the token below to reset your password:
        </p>

        <div style="margin: 20px 0; padding: 12px; background-color: #f1f1f1; border-left: 5px solid #3498db; font-size: 18px; font-weight: bold; word-break: break-all;">
        ${token}
        </div>

        <p style="font-size: 14px; color: #666;">
        ⏳ <strong>Note:</strong> This token will expire in <strong>15 minutes</strong>.
        </p>

        <p style="font-size: 14px; color: #999;">
        ❗If you did not request this password reset, you can safely ignore this email.
        </p>
        </div>
      `,
        });
    });
}
