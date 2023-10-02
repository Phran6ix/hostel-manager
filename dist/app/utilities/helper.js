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
exports.HelperFunctions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("./config"));
const email_1 = __importDefault(require("../services/email"));
const connect_redis_1 = require("../services/connect_redis");
const error_1 = require("./error");
const model_1 = __importDefault(require("../modules/agent/model"));
class HelperFunctions {
    static hashString(string) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashed = yield bcrypt_1.default.hash(string, config_1.default.HASH_SALT);
            return hashed;
        });
    }
    static comparePassword(hashed, plain) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(plain, hashed);
        });
    }
    static getToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign(user, config_1.default.JWT_SECRET, { expiresIn: 10000 });
        });
    }
    static DecodeJWt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.verifyToken(token);
            return user;
        });
    }
    static getUserDataFromToken(headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = headers.authorization.split(" ")[1];
            const data = yield this.DecodeJWt(token);
            return data;
        });
    }
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        });
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
    static sendOTPToEmail(email, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.generateOTP();
            yield new email_1.default({
                email,
                subject,
                message: `Your OTP is ${otp}`,
            }).sendMail();
            yield connect_redis_1.redisClient.set(`otp-email_${email}`, otp, {
                EX: 10 * 60,
            });
            return;
        });
    }
    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    static verifyOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            let otpKey = `otp-email_${email}`;
            const otpData = yield connect_redis_1.redisClient.get(otpKey);
            if (!otpData || otpData != otp) {
                return null;
            }
            yield connect_redis_1.redisClient.del(otpKey);
            return true;
        });
    }
    static protect(req, res, next) {
        // this.verifyToken(req.headers.authorization.split(" ")[1])
        console.log('Restricted route');
        this.getUserDataFromToken(req.headers)
            .then((res) => {
            if (!res)
                return next((0, error_1.AuthorizedError)("Invalid Token"));
            req.user = res;
            next();
        })
            .catch((error) => {
            next((0, error_1.AuthorizedError)("Invalid Token"));
        });
    }
    ;
    static validateAgent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization) {
                    return next((0, error_1.AuthorizedError)("You are  not logged in"));
                }
                let token = req.headers.authorization.split(' ')[1];
                let payload = yield HelperFunctions.DecodeJWt(token);
                if (!payload) {
                    return next((0, error_1.AuthorizedError)("Invalid Token"));
                }
                console.log(payload);
                let agent = yield model_1.default.findOne({ agentId: payload.agentId }).lean();
                console.log(agent);
                if (!agent) {
                    return next((0, error_1.InvalidRequestError)("Something went wrong, please sign in again"));
                }
                req.user = agent;
                return next();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static validateRole(...roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role))
                throw (0, error_1.AuthorizedError)("You are not authorized");
            next();
        };
    }
    ;
    static validate(schema) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.parse({
                    headers: req.headers,
                    body: req.body,
                    query: req.query,
                    params: req.param,
                });
                return next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static UUID() {
        return (0, uuid_1.v1)();
    }
    static paginate(data) {
        const offset = data.page * data.limit - data.limit;
        return {
            offset,
            limit: data.limit,
        };
    }
}
exports.HelperFunctions = HelperFunctions;
