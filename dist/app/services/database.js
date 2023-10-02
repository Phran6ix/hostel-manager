"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../utilities/config"));
const constant_1 = __importDefault(require("../utilities/constant"));
class Database {
    constructor() {
        this.connectMongoose();
        this.connectSequelize();
    }
    connectMongoose() {
        if (config_1.default.NODE_ENV == constant_1.default.NODE_ENVIRONMENT["DEVELOPMENT"]) {
            return mongoose_1.default
                .connect(`mongodb://${config_1.default.MONGO_HOST}:${config_1.default.MONGO_PORT}/hoster-manager`)
                .then(() => {
                console.log(`MongoDB connected on port ${config_1.default.MONGO_PORT}`);
            })
                .catch((error) => {
                console.error(`MongoDB connection failed , ${error}`);
            });
        }
        else if (config_1.default.NODE_ENV == constant_1.default.NODE_ENVIRONMENT["PRODUCTION"] && !!config_1.default.MONGO_URI) {
            return mongoose_1.default
                .connect(config_1.default.MONGO_URI)
                .then(() => {
                console.log("MongoDB database connection successful");
            })
                .catch((error) => {
                console.error(`MongoDB connection failed , ${error}`);
            });
        }
        else {
            console.log("......MONGO CONNECTION FAILED......");
        }
    }
    connectSequelize() {
        // sequelize
        //   .authenticate()
        //   .then(() => console.log(`Database connected successfully`))
        //   .catch((error) => {
        //     console.log("postgres error");
        //     console.error(`Database connection failed, ${error}`);
        //   });
        Database.sequelize
            .sync({ alter: false })
            .then(() => {
            console.log("Sequelize Database connected successfully");
        })
            .catch((error) => {
            console.log("Sequelize connection failed", error);
        });
    }
}
Database.sequelize = new sequelize_1.Sequelize(`postgres://${config_1.default.POSTGRES_USER}:${config_1.default.POSTGRES_PASSWORD}@${config_1.default.POSTGRES_HOST}:5432/${config_1.default.POSTGRES_DB}`, { dialect: "postgres" });
exports.default = Database;
