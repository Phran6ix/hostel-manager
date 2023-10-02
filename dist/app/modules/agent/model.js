"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helper_1 = require("../../utilities/helper");
const constant_1 = __importDefault(require("../../utilities/constant"));
const AgentSchema = new mongoose_1.Schema({
    agentId: {
        type: String,
        default: () => helper_1.HelperFunctions.UUID()
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [...Object.values(constant_1.default.AGENT_ROLE)]
    },
    avatar: {
        type: String
    },
    agencyName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, versionKey: false,
    toObject: {
        transform: function (doc, ret) {
            delete ret._id;
            let { password } = ret, returnValue = __rest(ret, ["password"]);
            return returnValue;
        }
    }
});
const Agent = (0, mongoose_1.model)('Agent', AgentSchema);
exports.default = Agent;
