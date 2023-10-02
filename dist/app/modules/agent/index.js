"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("./validation"));
const controller_1 = __importDefault(require("./controller"));
const helper_1 = require("../../utilities/helper");
class AgentRouter {
    constructor() {
        this.path = "/agent";
        this.router = (0, express_1.Router)();
        this.instantiateRoute();
    }
    instantiateRoute() {
        this.router.post(`${this.path}/register`, helper_1.HelperFunctions.validate(validation_1.default.agent_sign_up), (...x) => new controller_1.default(...x).HTTPSignUp());
        this.router.post(`${this.path}/login`, helper_1.HelperFunctions.validate(validation_1.default.agent_sign_in), (...x) => new controller_1.default(...x).HTTPAgentSignIn());
        this.router.patch(`${this.path}/verify-account`, helper_1.HelperFunctions.validate(validation_1.default.agent_verify_account), (...x) => new controller_1.default(...x).HTTPAgentVerifyAccount());
    }
}
exports.default = AgentRouter;
