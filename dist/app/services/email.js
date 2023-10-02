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
const nodemailer_1 = __importDefault(require("nodemailer"));
const constant_1 = __importDefault(require("../utilities/constant"));
const config_1 = __importDefault(require("../utilities/config"));
class EmailService {
    constructor(payload) {
        this.to = payload.email;
        this.subject = payload.subject;
        this.message = payload.message;
        this.transport = this.initializeTranspot();
    }
    initializeTranspot() {
        if (config_1.default.NODE_ENV == constant_1.default.NODE_ENVIRONMENT.DEVELOPMENT) {
            return nodemailer_1.default.createTransport({
                host: config_1.default.SMTP_HOST,
                port: +config_1.default.SMTP_PORT,
                auth: {
                    user: config_1.default.SMTP_USER,
                    pass: config_1.default.SMTP_PASS,
                },
            });
        }
        else if (config_1.default.NODE_ENV == constant_1.default.NODE_ENVIRONMENT.PRODUCTION) {
            return nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: config_1.default.SMTP_EMAIL,
                    pass: config_1.default.SMTP_PASSWORD,
                },
            });
        }
        return this.transport;
    }
    get option() {
        return {
            to: this.to,
            from: "no-reply@gmail.com",
            subject: this.subject,
            text: this.message,
        };
    }
    // private option = {
    //   to: this.to,
    //   from: "no-reply@gmail.com",
    //   subject: this.subject,
    //   message: this.message,
    // };
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.sendMail(this.option);
        });
    }
}
exports.default = EmailService;
