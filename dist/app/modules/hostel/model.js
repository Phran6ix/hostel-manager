"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hostel = void 0;
const sequelize_1 = require("sequelize");
const constant_1 = __importDefault(require("../../utilities/constant"));
const database_1 = __importDefault(require("../../services/database"));
const helper_1 = require("../../utilities/helper");
// import sequelize from "../../services/connect_sequelize";
let sequelize = database_1.default.sequelize;
const Hostel = sequelize.define("Hostel", {
    hostelId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: helper_1.HelperFunctions.UUID(),
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(constant_1.default.HOSTEL_TYPE)),
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.Hostel = Hostel;
