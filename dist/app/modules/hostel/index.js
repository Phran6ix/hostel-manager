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
class HostelRoutes {
    constructor() {
        this.path = "/hostels";
        this.router = (0, express_1.Router)();
        this.instantiateRoutes();
    }
    instantiateRoutes() {
        this.router.post(`${this.path}`, validate(validation_1.default.create_hoste_validation), helper_1.HelperFunctions.validateAgent, (...x) => new controller_1.default(...x).HTTPCreateAnHostel());
        this.router.get(`${this.path}`, validate(validation_1.default.get_all_hostel), helper_1.HelperFunctions.protect, (...x) => new controller_1.default(...x).HTTPGetAllHostels());
        this.router.get(`${this.path}/:hostelId`, validate(validation_1.default.get_a_hostel), helper_1.HelperFunctions.protect, (...x) => new controller_1.default(...x).HTTPGetAHostel());
        this.router.patch(`${this.path}/update-hostel`, validate(validation_1.default.update_hostel), helper_1.HelperFunctions.validateAgent, (...x) => new controller_1.default(...x).HTTPUpdateHostel());
        this.router.delete(`${this.path}/delete-hostel/:hostelId`, validate(validation_1.default.delete_hostel), helper_1.HelperFunctions.validateAgent, (...x) => new controller_1.default(...x).HTTPDeleteHostel());
    }
}
exports.default = HostelRoutes;
