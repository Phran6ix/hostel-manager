"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../baseController"));
const service_1 = __importDefault(require("./service"));
class UserController extends baseController_1.default {
    constructor(req, res, next) {
        super(req, res, next);
    }
    HTTPRegisterAUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.RegisterUser(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPLoginAUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.Sign_in(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPVerifyAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.Verify_account(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
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
    HTTPUpdatePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const user = await HelperFunctions.getUserDataFromToken(this.req.headers);
                const data = yield service_1.default.Update_password(Object.assign({ user: this.req.user }, this.req.body));
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPResendOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.ResendOTP(this.req.query["email"]);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPVerifyOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.VerifyOTP(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPForgotPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.Forgot_password(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPResetPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.Reset_password(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPGetCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const user = await HelperFunctions.getUserDataFromToken(this.req.headers);
                const data = yield service_1.default.Get_Current_User({ user: this.req.user });
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPUpdateUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.req.user);
                const data = yield service_1.default.updateUserProfile({
                    user: this.req.user,
                    data: this.req.body,
                });
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
}
exports.default = UserController;
