import nodemailer from "nodemailer";

export const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ID!,
        pass: process.env.GMAIL_PASS!,
    },
});

export async function sendEmail(to: string, token: string) {
    await transpoter.sendMail({
        from: process.env.EMAIL_FROM!,
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
}
