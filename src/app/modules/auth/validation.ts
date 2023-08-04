import { z } from "zod";

class AuthValidation {
  static sign_up_schema = z.object({
    body: z.object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Email is not valid")
        .toLowerCase()
        .trim(),
      phone: z.string({ required_error: "Phone number is required" }).trim().startsWith("234"),
      fullname: z.string({ required_error: "Please input your fullname" }).trim(),
      password: z
        .string({ required_error: "Please input a password" })
        .trim()
        .min(6, "Password must have atleast 6 characters"),
    }),
  });

  static login_schema = z.object({
    body: z.object({
      email: z.string().email("Please input a valid email").optional(),
      phone: z.string().optional(),
      password: z.string().trim(),
    }),
  });

  static update_password_schema = z.object({
    body: z.object({
      password: z.string({ required_error: "Input your current password" }).trim(),
      new_password: z.string({ required_error: "Input your new password" }).trim(),
    }),
    headers: z.object({
      authorization: z
        .string({ required_error: "Unauthorized" })
        .startsWith("Bearer", "Invalid Token"),
    }),
  });

  static forgot_password = z.object({
    body: z.object({
      email: z.string({ required_error: "Email is required" }).email().trim().toLowerCase(),
    }),
  });
  static verify_otp = z.object({
    body: z.object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Input a valid email")
        .toLowerCase(),
      otp: z.string({ required_error: "Input the otp" }).trim(),
    }),
  });

  static reset_password = z.object({
    body: z.object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Input a valid email")
        .toLowerCase(),
      new_password: z.string({ required_error: "Input you new password" }).trim(),
    }),
  });

  static get_current_user = z.object({
    headers: z.object({
      authorization: z.string({ required_error: "Unauthorized" }).startsWith("Bearer"),
    }),
  });

  static request_phone_otp = z.object({
    body: z.object({
      phone: z.string({ required_error: "Phone number is required" }).trim(),
    }),
  });

  static verify_phone_otp = z.object({
    body: z.object({
      phone: z.string({ required_error: "Phone number is required" }),
      otp: z.string({ required_error: "OTP is required" }),
    }),
  });
}

export default AuthValidation;
