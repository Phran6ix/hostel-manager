import { Router } from "express";
import UserController from "./controller";
import AuthValidation from "./validation";
import { HelperFunctions } from "../../utilities/helper";
let validate = HelperFunctions.validate;

class UserRouter {
  public path = "/user";
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoute();
  }
  private initializeRoute() {
    this.router.post(`${this.path}`, validate(AuthValidation.sign_up_schema), (...a) =>
      new UserController(...a).HTTPRegisterAUser()
    );
    this.router.post(`${this.path}/sign_in`, validate(AuthValidation.login_schema), (...x) =>
      new UserController(...x).HTTPLoginAUser()
    );

    this.router.patch(`${this.path}/verify-account`, (...x) =>
      new UserController(...x).HTTPVerifyAccount()
    );

    this.router.patch(
      `${this.path}/update-password`,
      validate(AuthValidation.update_password_schema),
      HelperFunctions.protect,
      (...x) => new UserController(...x).HTTPUpdatePassword()
    );

    this.router.get(`${this.path}/resend-otp`, (...x) => new UserController(...x).HTTPResendOTP());
    this.router.get(
      `${this.path}/forgot-password`,
      validate(AuthValidation.forgot_password),
      (...x) => new UserController(...x).HTTPForgotPassword()
    );

    this.router.patch(
      `${this.path}/reset-password`,
      validate(AuthValidation.reset_password),
      (...x) => new UserController(...x).HTTPResetPassword()
    );

    this.router.patch(`${this.path}/verify-otp`, validate(AuthValidation.verify_otp), (...x) =>
      new UserController(...x).HTTPVerifyOTP()
    );

    this.router.get(
      `${this.path}/me`,
      validate(AuthValidation.get_current_user),
      HelperFunctions.protect,
      (...x) => new UserController(...x).HTTPGetCurrentUser()
    );

    this.router.patch(`${this.path}/update_profile`, HelperFunctions.protect, (...x) =>
      new UserController(...x).HTTPUpdateUserProfile()
    );

    // PHONE VERIFICATION
    // this.router.get(
    //   `${this.path}/send-phone-otp`,
    //   validate(AuthValidation.request_phone_otp),
    //   (...x) => new UserController(...x).HTTPSendPhoneVerification()
    // );
    // this.router.patch(
    //   `${this.path}/verify-phone-otp`,
    //   validate(AuthValidation.verify_phone_otp),
    //   (...x) => new UserController(...x).HTTPVerifyPhoneOTP()
    // );
  }
}

export default UserRouter;
