import UserRepository from "./repository";

const Repository = new UserRepository();

export default class UserService {
  public static async RegisterUser(data: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
  }) {
    await Repository.sign_up(data);
    return {
      status: 201,
      message: "User registered successfully",
      data: null,
    };
  }

  public static async Sign_in(data: { email?: string; phone_number?: string; password: string }) {
    return {
      status: 200,
      message: "User login successfully",
      data: await Repository.login(data),
    };
  }

  public static async Verify_account(data: { email: string; otp: string }) {
    await Repository.verifyAccount(data);
    return {
      status: 200,
      message: "Account Verified successfully",
      data: null,
    };
  }
  public static async Update_password(data: { user: any; password: string; new_password: string }) {
    await Repository.update_password(data);
    return {
      status: 200,
      message: "Password updated",
      data: null,
    };
  }
  public static async ResendOTP(email: string) {
    await Repository.sendOTP(email);
    return {
      status: 200,
      message: "OTP resent to your email",
      data: null,
    };
  }

  public static async VerifyOTP(data: { email: string; otp: string }) {
    await Repository.verifyOTP(data);
    return {
      status: 200,
      message: "OTP verified",
      data: null,
    };
  }

  public static async Forgot_password(data: { email?: string; phone_number?: string }) {
    await Repository.forgot_password(data);
    return {
      status: 200,
      message: "OTP for resetting password has been sent to your email",
      data: null,
    };
  }
  public static async Reset_password(data: { email: string; new_password: string }) {
    await Repository.reset_password(data);
    return {
      status: 200,
      message: "Password has been reset successfully",
      data: null,
    };
  }
  public static async Get_Current_User(data: { user: any }) {
    return {
      status: 200,
      message: "User data succesfully retrieved",
      data: await Repository.getCurrentUser(data),
    };
  }
}
