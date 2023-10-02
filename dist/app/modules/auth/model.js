"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constant_1 = __importDefault(require("../../utilities/constant"));
const helper_1 = require("../../utilities/helper");
const userSchema = new mongoose_1.Schema({
    // TASK - ADD UUID TO THE MODEL
    userId: {
        type: String,
        default: helper_1.HelperFunctions.UUID(),
    },
    fullname: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: Object.values(constant_1.default.USER_ROLES),
        defalut: constant_1.default.USER_ROLES.STUDENT,
    },
    otpVerified: {
        type: Boolean,
        default: false,
        select: false,
    },
}, {
    timestamps: true,
    virtuals: true,
    versionKey: false,
    toObject: {
        transform: function (doc, ret) {
            return {
                userId: ret.userId,
                email: ret.email,
                fullmame: ret.fullname,
                role: ret.role,
                phone_number: ret.phone,
                isVerified: ret.isVerified,
            };
        },
    },
    toJSON: {
        transform: function (doc, ret) {
            return {
                userId: ret.userId,
                email: ret.email,
                fullmame: ret.fullname,
                role: ret.role,
                phone_number: ret.phone,
                isVerified: ret.isVerified,
            };
        },
    },
});
exports.default = (0, mongoose_1.model)("user", userSchema);
