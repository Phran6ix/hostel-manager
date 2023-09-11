import { IResponseType } from "../../utilities/types";
import UserRepository from "./repository";
import { IUserType } from "./types";

const Repository = new UserRepository();

export default class UserService {
  public static async RegisterUser(data: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
  }): Promise<IResponseType> {
    await Repository.sign_up(data);
    return {
      status: 201,
      message: "User registered successfully, ",
      data: { message: "OTP has been sent to your mail" },
    };
  }

  public static async Sign_in(data: {
    email?: string;
    phone_number?: string;
    password: string;
  }): Promise<IResponseType> {
    return {
      status: 200,
      message: "User login successfully",
      data: await Repository.login(data),
    };
  }

  public static async Verify_account(data: { email: string; otp: string }): Promise<IResponseType> {
    await Repository.verifyAccount(data);
    return {
      status: 200,
      message: "Account Verified successfully",
      data: null,
    };
  }
  public static async Update_password(data: {
    user: any;
    password: string;
    new_password: string;
  }): Promise<IResponseType> {
    await Repository.update_password(data);
    return {
      status: 200,
      message: "Password updated",
      data: null,
    };
  }
  public static async ResendOTP(email: string): Promise<IResponseType> {
    await Repository.sendOTP(email);
    return {
      status: 200,
      message: "OTP resent to your email",
      data: null,
    };
  }

  public static async VerifyOTP(data: { email: string; otp: string }): Promise<IResponseType> {
    await Repository.verifyOTP(data);
    return {
      status: 200,
      message: "OTP verified",
      data: null,
    };
  }

  public static async SendPhoneOTP(data: { phone: string }): Promise<IResponseType> {
    // await Repository.sendOTPToPhone(data);
    return {
      status: 200,
      message: "OTP has been sent your phone",
      data: null,
    };
  }

  public static async VerifyPhoneOTP(data: { phone: string; otp: string }): Promise<IResponseType> {
    // await Repository.verifyPhoneOTP(data);
    return {
      status: 200,
      message: "Phone number has been verified",
      data: null,
    };
  }

  public static async UploadProfilePhoto(data: {
    user: IUserType;
    avatar: string;
  }): Promise<IResponseType> {
    await Repository.uploadProfilePhoto(data);
    return {
      status: 203,
      message: "Profile photo has been uploaded successsfuly",
      data: null,
    };
  }

  public static async Forgot_password(data: {
    email?: string;
    phone_number?: string;
  }): Promise<IResponseType> {
    await Repository.forgot_password(data);
    return {
      status: 200,
      message: "OTP for resetting password has been sent to your email",
      data: null,
    };
  }
  public static async Reset_password(data: {
    email: string;
    new_password: string;
  }): Promise<IResponseType> {
    await Repository.reset_password(data);
    return {
      status: 200,
      message: "Password has been reset successfully",
      data: null,
    };
  }
  public static async Get_Current_User(data: { user: Partial<IUserType> }): Promise<IResponseType> {
    return {
      status: 200,
      message: "User data succesfully retrieved",
      data: await Repository.getCurrentUser(data),
    };
  }

  public static async updateUserProfile(data: {
    user: Partial<IUserType>;
    data: any;
  }): Promise<IResponseType> {
    await Repository.updateUserProfile(data);
    return {
      status: 203,
      message: "User profile updated successfully",
      data: null,
    };
  }
}
