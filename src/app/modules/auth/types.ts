import { Document } from "mongoose";
export interface IUserType extends Document {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isVerified: boolean;
  otpVerified?: boolean;
}

// USER REPOSITORY
export interface IUserRepo<T> {
  sign_up(data: Partial<T>): Promise<void>;
  login(data: {
    email?: string;
    phone_number?: string;
    password: string;
  }): Promise<{ token: string; user: Partial<T> }>;
  forgot_password(props: { email?: string; phone_number?: string }): Promise<void>;
  reset_password(data: { email: string; new_password: string }): Promise<void>;

  update_password(props: {
    user: Partial<T>;
    password: string;
    new_password: string;
  }): Promise<void>;
  sendOTP(email: string): Promise<void>;

  verifyAccount(props: { email: string; otp: string }): Promise<void>;

  verifyOTP(props: { email: string; otp: string }): Promise<void>;
}
