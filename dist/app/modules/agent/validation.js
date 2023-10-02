"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const constant_1 = __importDefault(require("../../utilities/constant"));
exports.default = {
    agent_sign_up: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string({ required_error: "name is required" }),
            email: zod_1.z.string({ required_error: "email is required" }).email("Please input a valid email").toLowerCase(),
            password: zod_1.z.string({ required_error: "password is required" }).min(6, "password should be a minimum of 6 characters").refine((password) => {
                const regex = /^[a-zA-Z0-9]*$/;
                return regex.test(password);
            }),
            address: zod_1.z.string({ required_error: "address is required" }),
            phone: zod_1.z.string({ required_error: "phone number is required" }),
            role: zod_1.z.nativeEnum(constant_1.default.AGENT_ROLE),
            agencyName: zod_1.z.string().optional()
        })
    }),
    agent_sign_in: zod_1.z.object({
        body: zod_1.z.object({
            email: zod_1.z.string().email().toLowerCase().optional(),
            phone: zod_1.z.string().optional(),
            password: zod_1.z.string({ required_error: "password is required" })
        })
    }),
    agent_verify_account: zod_1.z.object({
        body: zod_1.z.object({
            email: zod_1.z.string({ required_error: "email is required" }).email().toLowerCase(),
            otp: zod_1.z.string({ required_error: "otp is required" })
        })
    })
};
