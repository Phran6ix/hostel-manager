import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AnyZodObject } from "zod";

import Config from "./config";
import Constants from "./constant";
import { IUserType } from "../modules/auth/types";
import EmailService from "../services/email";
import { redisClient } from "../services/connect_redis";
import { HTTPErrorType } from "./error";
import { Response } from "express";
import SMSService from "../services/sms";

// HASHING
export class HelperFunctions {
  public static async hashString(string: string) {
    const hashed = await bcrypt.hash(string, Config.HASH_SALT);

    return hashed;
  }
  public static async comparePassword(hashed: string, plain: string) {
    return await bcrypt.compare(plain, hashed);
  }
  public static async getToken(user: Partial<IUserType>) {
    return await jwt.sign(user, Config.JWT_SECRET, { expiresIn: 10000 });
  }

  public static async DecodeJWt(token: string): Promise<Partial<IUserType>> {
    const user = await jwt.verify(token, Config.JWT_SECRET);

    return user as IUserType;
  }

  public static async getUserDataFromToken(headers: any) {
    const token = headers.authorization.split(" ")[1];
    const data = await this.DecodeJWt(token);
    return data;
  }

  public static async verifyToken(token: string) {
    return await jwt.verify(token, Config.JWT_SECRET);
  }

  public static async SendOTPToPhone(phone: string): Promise<void> {
    const otp = this.generateOTP();

    let text = `Your one time Account verification is ${otp}`;
    await new SMSService({ body: text, to: phone }).sendMessage();

    await redisClient.set(`otp_phone-${phone}`, otp, {
      EX: 10 * 60,
    });
    return;
  }

  public static async VerifyPhoneOtp(phone: string, otp: string): Promise<boolean> {
    const otpKey = `otp-phone_${phone}`;

    const otpData = await redisClient.get(otpKey);

    if (!otpData || otpData != otp) {
      return false;
    }
    await redisClient.del(otpKey);
    return true;
  }

  public static async sendOTPToEmail(email: string, subject: string) {
    const otp = this.generateOTP();

    await new EmailService({
      email,
      subject,
      message: `Your OTP is ${otp}`,
    }).sendMail();

    await redisClient.set(`otp-email_${email}`, otp, {
      EX: 10 * 60,
    });
    return;
  }
  static generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  public static async verifyOTP(email: string, otp: string) {
    let otpKey = `otp-email_${email}`;
    const otpData = await redisClient.get(otpKey);

    if (!otpData || otpData != otp) {
      return null;
    }
    await redisClient.del(otpKey);
    return true;
  }

  public static validate(schema: AnyZodObject) {
    return async (req: any, res: any, next: any) => {
      try {
        await schema.parse({
          headers: req.headers,
          body: req.body,
          query: req.query,
          params: req.param,
        });
        return next();
      } catch (error) {
        next(error);
      }
    };
  }

  public static ErrorHandler = (err: HTTPErrorType, res: Response) => {
    return res.status(err.statusCode || 500).json();
  };
}
