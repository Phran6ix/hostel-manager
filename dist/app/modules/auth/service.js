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
const repository_1 = __importDefault(require("./repository"));
const Repository = new repository_1.default();
class UserService {
    static RegisterUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.sign_up(data);
            return {
                status: 201,
                message: "User registered successfully, ",
                data: { message: "OTP has been sent to your mail" },
            };
        });
    }
    static Sign_in(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "User login successfully",
                data: yield Repository.login(data),
            };
        });
    }
    static Verify_account(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.verifyAccount(data);
            return {
                status: 200,
                message: "Account Verified successfully",
                data: null,
            };
        });
    }
    static Update_password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.update_password(data);
            return {
                status: 200,
                message: "Password updated",
                data: null,
            };
        });
    }
    static ResendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.sendOTP(email);
            return {
                status: 200,
                message: "OTP resent to your email",
                data: null,
            };
        });
    }
    static VerifyOTP(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.verifyOTP(data);
            return {
                status: 200,
                message: "OTP verified",
                data: null,
            };
        });
    }
    static SendPhoneOTP(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // await Repository.sendOTPToPhone(data);
            return {
                status: 200,
                message: "OTP has been sent your phone",
                data: null,
            };
        });
    }
    static VerifyPhoneOTP(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // await Repository.verifyPhoneOTP(data);
            return {
                status: 200,
                message: "Phone number has been verified",
                data: null,
            };
        });
    }
    static UploadProfilePhoto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.uploadProfilePhoto(data);
            return {
                status: 203,
                message: "Profile photo has been uploaded successsfuly",
                data: null,
            };
        });
    }
    static Forgot_password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.forgot_password(data);
            return {
                status: 200,
                message: "OTP for resetting password has been sent to your email",
                data: null,
            };
        });
    }
    static Reset_password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.reset_password(data);
            return {
                status: 200,
                message: "Password has been reset successfully",
                data: null,
            };
        });
    }
    static Get_Current_User(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "User data succesfully retrieved",
                data: yield Repository.getCurrentUser(data),
            };
        });
    }
    static updateUserProfile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.updateUserProfile(data);
            return {
                status: 203,
                message: "User profile updated successfully",
                data: null,
            };
        });
    }
}
exports.default = UserService;
