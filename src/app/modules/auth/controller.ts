import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import UserService from "./service";
import { HelperFunctions } from "../../utilities/helper";
import { IUserType } from "./types";

class UserController extends BaseController {
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }
  public async HTTPRegisterAUser(): Promise<any> {
    try {
      const data = await UserService.RegisterUser(this.req.body);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
  public async HTTPLoginAUser(): Promise<any> {
    try {
      const data = await UserService.Sign_in(this.req.body);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
  public async HTTPVerifyAccount(): Promise<any> {
    try {
      const data = await UserService.Verify_account(this.req.body);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
     public async HTTPGetUserProfileSummart():Promise<void> {
        try {
            let {userId} = this.req.user as IUserType
           const data = await UserService.GetProfileSummary({userId}) 
            this.responseHandler(data)
        } catch (error) {
           this.next(error) 
        }
    }

  // public async HTTPSendPhoneVerification(): Promise<any> {
  //   try {
  //     // const data = await UserService.SendPhoneOTP(this.req.body);
  //     this.responseHandler(data);
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }

  // public async HTTPVerifyPhoneOTP(): Promise<any> {
  //   try {
  //     const data = await UserService.VerifyPhoneOTP(this.req.body);
  //     this.responseHandler(data);
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }
  public async HTTPUpdatePassword(): Promise<any> {
    try {
      // const user = await HelperFunctions.getUserDataFromToken(this.req.headers);
      const data = await UserService.Update_password({ user: this.req.user, ...this.req.body });

      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
  public async HTTPResendOTP(): Promise<any> {
    try {
      const data = await UserService.ResendOTP(this.req.query["email"] as string);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
  public async HTTPVerifyOTP(): Promise<any> {
    try {
      const data = await UserService.VerifyOTP(this.req.body);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
  public async HTTPForgotPassword(): Promise<any> {
    try {
      const data = await UserService.Forgot_password(this.req.query);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
  public async HTTPResetPassword(): Promise<any> {
    try {
      const data = await UserService.Reset_password(this.req.body);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPGetCurrentUser(): Promise<any> {
    try {
      // const user = await HelperFunctions.getUserDataFromToken(this.req.headers);
      const data = await UserService.Get_Current_User({ user: this.req.user as IUserType });
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPUpdateUserProfile(): Promise<any> {
    try {
      console.log(this.req.user);
      const data = await UserService.updateUserProfile({
        user: this.req.user as IUserType,
        data: this.req.body,
      });
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }
}

export default UserController;
