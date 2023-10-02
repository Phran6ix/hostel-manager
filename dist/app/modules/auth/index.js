"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validation_1 = __importDefault(require("./validation"));
const helper_1 = require("../../utilities/helper");
let validate = helper_1.HelperFunctions.validate;
class UserRouter {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post(`${this.path}`, validate(validation_1.default.sign_up_schema), (...a) => new controller_1.default(...a).HTTPRegisterAUser());
        this.router.post(`${this.path}/sign_in`, validate(validation_1.default.login_schema), (...x) => new controller_1.default(...x).HTTPLoginAUser());
        this.router.patch(`${this.path}/verify-account`, (...x) => new controller_1.default(...x).HTTPVerifyAccount());
        this.router.patch(`${this.path}/update-password`, validate(validation_1.default.update_password_schema), helper_1.HelperFunctions.protect, (...x) => new controller_1.default(...x).HTTPUpdatePassword());
        this.router.get(`${this.path}/resend-otp`, (...x) => new controller_1.default(...x).HTTPResendOTP());
        this.router.get(`${this.path}/forgot-password`, validate(validation_1.default.forgot_password), (...x) => new controller_1.default(...x).HTTPForgotPassword());
        this.router.patch(`${this.path}/reset-password`, validate(validation_1.default.reset_password), (...x) => new controller_1.default(...x).HTTPResetPassword());
        this.router.patch(`${this.path}/verify-otp`, validate(validation_1.default.verify_otp), (...x) => new controller_1.default(...x).HTTPVerifyOTP());
        this.router.get(`${this.path}/me`, validate(validation_1.default.get_current_user), helper_1.HelperFunctions.protect, (...x) => new controller_1.default(...x).HTTPGetCurrentUser());
        this.router.patch(`${this.path}/update_profile`, helper_1.HelperFunctions.protect, (...x) => new controller_1.default(...x).HTTPUpdateUserProfile());
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
exports.default = UserRouter;
