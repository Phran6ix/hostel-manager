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
const error_1 = require("../../utilities/error");
const helper_1 = require("../../utilities/helper");
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../auth/model"));
class AgentRepo {
    constructor() {
        this.model = model_1.default;
    }
    SignUpAsAgent(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = new this.model(Object.assign({}, payload));
                if (yield model_2.default.findOne({ email: payload.email }).lean().select("email")) {
                    throw (0, error_1.ExistError)("An Account with this email already exists");
                }
                agent.password = (yield helper_1.HelperFunctions.hashString("" + payload.password));
                yield helper_1.HelperFunctions.sendOTPToEmail(agent.email, "One-Time password for you account verification");
                yield agent.save();
                return agent.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    LoginAsAnAgent(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agent;
                if (payload.email) {
                    agent = yield this.model.findOne({ email: payload.email });
                }
                if (payload.phone) {
                    agent = yield this.model.findOne({ phone: payload.phone });
                }
                if (!agent) {
                    throw (0, error_1.NotFoundError)("Account not found");
                }
                if (!(yield helper_1.HelperFunctions.comparePassword(agent.password, payload.password))) {
                    throw (0, error_1.InvalidRequestError)("Invalid password");
                }
                return { token: yield helper_1.HelperFunctions.getToken(agent.toObject()), agent: agent.toObject() };
            }
            catch (error) {
                throw error;
            }
        });
    }
    VerifyAgentAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agent = yield this.model.findOne({ email: data.email }).select('isVerified email');
                if (!agent) {
                    throw (0, error_1.NotFoundError)("Account not found");
                }
                if (agent.isVerified) {
                    throw (0, error_1.AccountStatusError)("Your account has already been verified");
                }
                let verifiedStatus = yield helper_1.HelperFunctions.verifyOTP(agent.email, data.otp);
                if (!verifiedStatus) {
                    throw (0, error_1.AccountStatusError)("Invalid OTP, please try again");
                }
                agent.isVerified = true;
                yield agent.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ForgotPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield this.model.findOne({ email: data.email }).lean().select('email');
                if (!agent) {
                    throw (0, error_1.NotFoundError)("Account with not found");
                }
                yield helper_1.HelperFunctions.sendOTPToEmail(agent.email, "OTP for password reset");
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ResetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield this.model.findOne({ email: data.email }).select('email password');
                if (!agent) {
                    throw (0, error_1.NotFoundError)("Account not found");
                }
                let verifyStatus = yield helper_1.HelperFunctions.verifyOTP(data.email, data.otp);
                if (!verifyStatus) {
                    throw (0, error_1.AccountStatusError)("Invalid OTP");
                }
                if (yield helper_1.HelperFunctions.comparePassword(agent.password, data.password)) {
                    throw (0, error_1.InvalidRequestError)("New password cannot be the same as the old password");
                }
                agent.password = yield helper_1.HelperFunctions.hashString(data.password);
                yield agent.save();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AgentRepo;
