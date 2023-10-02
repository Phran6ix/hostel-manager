"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../utilities/config"));
const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.default.POSTGRES_USER}:${config_1.default.POSTGRES_PASSWORD}@${config_1.default.POSTGRES_HOST}:5432/${config_1.default.POSTGRES_DB}`, { dialect: "postgres" });
exports.default = sequelize;
