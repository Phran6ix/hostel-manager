"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class AuthValidation {
}
AuthValidation.sign_up_schema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Email is not valid")
            .toLowerCase()
            .trim(),
        phone: zod_1.z.string({ required_error: "Phone number is required" }).trim(),
        fullname: zod_1.z.string({ required_error: "Please input your fullname" }).trim(),
        password: zod_1.z
            .string({ required_error: "Please input a password" })
            .trim()
            .min(6, "Password must have atleast 6 characters"),
    }),
});
AuthValidation.login_schema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please input a valid email").optional(),
        phone: zod_1.z.string().optional(),
        password: zod_1.z.string().trim(),
    }),
});
AuthValidation.update_password_schema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "Input your current password" }).trim(),
        new_password: zod_1.z.string({ required_error: "Input your new password" }).trim(),
    }),
    headers: zod_1.z.object({
        authorization: zod_1.z
            .string({ required_error: "Unauthorized" })
            .startsWith("Bearer", "Invalid Token"),
    }),
});
AuthValidation.forgot_password = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email().trim().toLowerCase(),
    }),
});
AuthValidation.verify_otp = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Input a valid email")
            .toLowerCase(),
        otp: zod_1.z.string({ required_error: "Input the otp" }).trim(),
    }),
});
AuthValidation.reset_password = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Input a valid email")
            .toLowerCase(),
        new_password: zod_1.z.string({ required_error: "Input you new password" }).trim(),
    }),
});
AuthValidation.get_current_user = zod_1.z.object({
    headers: zod_1.z.object({
        authorization: zod_1.z.string({ required_error: "Unauthorized" }).startsWith("Bearer"),
    }),
});
AuthValidation.request_phone_otp = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z.string({ required_error: "Phone number is required" }).trim(),
    }),
});
AuthValidation.verify_phone_otp = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z.string({ required_error: "Phone number is required" }),
        otp: zod_1.z.string({ required_error: "OTP is required" }),
    }),
});
exports.default = AuthValidation;
