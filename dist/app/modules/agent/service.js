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
class AgentService {
    constructor() {
        this.repository = new repository_1.default();
    }
    AgentSignUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 201,
                message: "Your account has been successfully registered",
                data: yield this.repository.SignUpAsAgent(payload)
            };
        });
    }
    AgentSignIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "Account signed in successfully",
                data: yield this.repository.LoginAsAnAgent(payload)
            };
        });
    }
    VerifyAgentAccount(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "Account has been verified successfully",
                data: yield this.repository.VerifyAgentAccount(payload)
            };
        });
    }
    ForgotAgentAccountPassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.ForgotPassword(payload);
            return {
                status: 200,
                "message": "OTP for password reset has been sent to your mail",
                data: null
            };
        });
    }
    ResetAgentAccountPassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.ResetPassword(payload);
            return {
                status: 200,
                message: "Password has been reset successfully",
                data: null
            };
        });
    }
}
exports.default = AgentService;
