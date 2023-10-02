import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AnyZodObject } from "zod";
import { v1 as uuidV1 } from "uuid";

import Config from "./config";
import Constants from "./constant";
import { IUserType } from "../modules/auth/types";
import EmailService from "../services/email";
import { redisClient } from "../services/connect_redis";
import { AuthorizedError, HTTPErrorType, InvalidRequestError } from "./error";
import { NextFunction, Response } from "express";
import { AgentInterface } from "../modules/agent/type";
import Agent from "../modules/agent/model";

export class HelperFunctions {
  public static async hashString(string: string) {
    const hashed = await bcrypt.hash(string, Config.HASH_SALT);

    return hashed;
  }
  public static async comparePassword(hashed: string, plain: string) {
    return await bcrypt.compare(plain, hashed);
  }
  public static async getToken(user: Partial<IUserType | AgentInterface>) {
    return await jwt.sign(user, Config.JWT_SECRET, { expiresIn: 10000 });
  }

  public static async DecodeJWt(token: string): Promise<IUserType | AgentInterface> {

    const user = await this.verifyToken(token);

    return user as IUserType | AgentInterface ;
  }

  public static async getUserDataFromToken(headers: any) {
    const token = headers.authorization.split(" ")[1];
    const data = await this.DecodeJWt(token);
    return data;
  }

  public static async verifyToken(token: string) {
    return await jwt.verify(token, Config.JWT_SECRET);
  }

  // public

  // public static async SendOTPToPhone(phone: string): Promise<void> {
  //   const otp = this.generateOTP();

  //   let text = `Your one time Account verification is ${otp}`;
  //   await new SMSService({ body: text, to: phone }).sendMessage();

  //   await redisClient.set(`otp_phone-${phone}`, otp, {
  //     EX: 10 * 60,
  //   });
  //   return;
  // }

  // public static async VerifyPhoneOtp(phone: string, otp: string): Promise<boolean> {
  //   const otpKey = `otp-phone_${phone}`;

  //   const otpData = await redisClient.get(otpKey);

  //   if (!otpData || otpData != otp) {
  //     return false;
  //   }
  //   await redisClient.del(otpKey);
  //   return true;
  // }

  public static async sendOTPToEmail(email: string, subject: string): Promise<void> {
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

  public static async verifyOTP(email: string, otp: string): Promise<Boolean | null> {
    let otpKey = `otp-email_${email}`;
    const otpData = await redisClient.get(otpKey);

    if (!otpData || otpData != otp) {
      return null;
    }
    await redisClient.del(otpKey);
    return true;
  }

  public static protect(req: any, res: any, next: any) {
    // this.verifyToken(req.headers.authorization.split(" ")[1])
    console.log('Restricted route')
    this.getUserDataFromToken(req.headers)
      .then((res) => {
        if (!res) return next(AuthorizedError("Invalid Token"));
        req.user = res;
        next();
      })
      .catch((error) => {
        next(AuthorizedError("Invalid Token"));
      });
  };

  public static async validateAgent(req: any, res: any, next: any) {
    try {
      if (!req.headers.authorization) { return next(AuthorizedError("You are  not logged in")) }
      let token = req.headers.authorization.split(' ')[1]

      let payload = await HelperFunctions.DecodeJWt(token) as AgentInterface
      if (!payload) {
        return next(AuthorizedError("Invalid Token"))
      }
      console.log(payload)
      let agent = await Agent.findOne({ agentId: payload.agentId }).lean()
      console.log(agent)

      if (!agent) { return next(InvalidRequestError("Something went wrong, please sign in again")) }

      req.user = agent
      return next()
    } catch (error) {
      throw error
    }
  }

  public static validateRole(...roles: any) {
    return (req: any, res: any, next: any) => {
      if (!roles.includes(req.user.role)) throw AuthorizedError("You are not authorized");
      next();
    };
  };

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

  public static UUID() {
    return uuidV1();
  }

  public static paginate(data: { page: number; limit: number }): { limit: number; offset: number } {
    const offset = data.page * data.limit - data.limit;
    return {
      offset,
      limit: data.limit,
    };
  }
}
