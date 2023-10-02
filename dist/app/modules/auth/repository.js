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
const helper_1 = require("../../utilities/helper");
const model_1 = __importDefault(require("./model"));
const error_1 = require("../../utilities/error");
const constant_1 = __importDefault(require("../../utilities/constant"));
class UserRepository {
    sendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.findOne({ email }).lean();
                if (!user) {
                    throw (0, error_1.NotFoundError)("Account with this email not found");
                }
                yield helper_1.HelperFunctions.sendOTPToEmail(email, constant_1.default.MAIL_SUBJECT.RESEND_OTP);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update_password(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.findOne({ email: props.user["email"] });
                let verifyPassword = yield helper_1.HelperFunctions.comparePassword(user.password, props.password);
                if (!verifyPassword)
                    throw (0, error_1.AuthorizedError)("Your password is incorrect");
                if (!(user === null || user === void 0 ? void 0 : user.isVerified))
                    throw (0, error_1.AccountStatusError)("Your account is not verified");
                user.password = yield helper_1.HelperFunctions.hashString(props.new_password);
                yield user.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    sign_up(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new model_1.default({
                    email: data.email,
                    fullname: data.fullname,
                    phone: data.phone,
                    password: yield helper_1.HelperFunctions.hashString("" + data.password),
                });
                yield helper_1.HelperFunctions.sendOTPToEmail(user.email, constant_1.default.MAIL_SUBJECT.SIGN_UP);
                yield user.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                if (!!data.email)
                    user = yield model_1.default.findOne({ email: data.email });
                if (!!data.phone_number)
                    user = yield model_1.default.findOne({ phone: data.phone_number });
                if (!user) {
                    throw (0, error_1.NotFoundError)("Account not found");
                }
                if (!(yield helper_1.HelperFunctions.comparePassword(user.password, data.password))) {
                    throw (0, error_1.AuthorizedError)("Invalid Password");
                }
                if (!user.isVerified)
                    throw (0, error_1.AccountStatusError)("Your account is not verified");
                user = user.toObject();
                console.log(user);
                const token = yield helper_1.HelperFunctions.getToken(user);
                return {
                    user,
                    token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyAccount(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.default.findOne({
                    email: props.email,
                });
                if (!user)
                    throw (0, error_1.NotFoundError)("Account not found");
                if (user.isVerified)
                    throw (0, error_1.AccountStatusError)("Your account is already verified");
                const validOtp = yield helper_1.HelperFunctions.verifyOTP(props.email, props.otp);
                if (!validOtp) {
                    throw (0, error_1.InvalidTokenError)("OTP is Invalid or Expired ");
                }
                user.isVerified = true;
                yield user.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    uploadProfilePhoto(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.findOne({ userId: props.user.userId });
                if (!user)
                    throw (0, error_1.NotFoundError)("User Not Found");
                user.avatar = props["avatar"];
                yield user.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyOTP(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validOtp = yield helper_1.HelperFunctions.verifyOTP(props.email, props.otp);
                if (validOtp) {
                    throw (0, error_1.InvalidTokenError)("Token has expired or invalid");
                }
                let user = yield model_1.default.findOneAndUpdate({ email: props["email"] }, { otpVerified: true });
                if (!user)
                    throw (0, error_1.NotFoundError)("Account not found");
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // FOR PHONE NUMBER VERIFICATION
    // public async sendOTPToPhone(props: { phone: string }): Promise<void> {
    //   try {
    //     console.log(props)
    //     const user = await User.findOne({ phone: props["phone"] });
    //     if (!user) throw NotFoundError("User not found");
    //     if (user.isVerified) throw AccountStatusError("Your Account is already verified");
    //     await HelperFunctions.SendOTPToPhone(user.phone);
    //     console.log("DONE");
    //     return;
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    // public async verifyPhoneOTP(props: { phone: string; otp: string }): Promise<void> {
    //   try {
    //     const user = await User.findOne({ phone: props["phone"] });
    //     if (!user) throw NotFoundError("User not found");
    //     const verified = await HelperFunctions.VerifyPhoneOtp(props["phone"], props["otp"]);
    //     if (!verified) throw VerificatioError("Invalid or Expired token");
    //     user.isVerified = true;
    //     await user.save();
    //     return;
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    forgot_password(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                if (!!props.email) {
                    user = yield model_1.default.findOne({ email: props.email });
                }
                if (!!props.phone_number) {
                    user = yield model_1.default.findOne({ phone: props.phone_number });
                }
                if (!user) {
                    throw (0, error_1.NotFoundError)("Account with this details not found");
                }
                yield helper_1.HelperFunctions.sendOTPToEmail(user.email, constant_1.default.MAIL_SUBJECT.FORGOT_PASSWORD);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    reset_password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield model_1.default.findOne({ email: data["email"] }).select("otpVerified");
                if (!user)
                    throw (0, error_1.NotFoundError)("Account not found");
                if (!user.otpVerified) {
                    throw (0, error_1.InvalidRequestError)("Your account is not authorized for this action at the moment, please verify with otp");
                }
                let hashed = yield helper_1.HelperFunctions.hashString(data.new_password);
                user.otpVerified = false;
                user.password = hashed;
                yield user.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCurrentUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.findOne({ email: data.user["email"] });
                if (!user)
                    throw (0, error_1.NotFoundError)("Account Not found");
                return user.toJSON();
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUserProfile(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield model_1.default.findOne({ userId: props.user.userId }));
                if (!user)
                    throw (0, error_1.NotFoundError)("User not found");
                console.log(user);
                if (!!props.data.email) {
                    throw (0, error_1.AuthorizedError)("Email cannot be updated after registration");
                }
                Object.keys(props.data).forEach((key) => {
                    user[key] = props.data.key;
                });
                console.log(user);
                yield user.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
