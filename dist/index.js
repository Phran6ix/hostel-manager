"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const config_1 = __importDefault(require("./app/utilities/config"));
const database_1 = __importDefault(require("./app/services/database"));
// ROUTES
const auth_1 = __importDefault(require("./app/modules/auth"));
const hostel_1 = __importDefault(require("./app/modules/hostel"));
const agent_1 = __importDefault(require("./app/modules/agent"));
const globalErrorHandler_1 = __importDefault(require("./app/utilities/globalErrorHandler"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.apiVersion = "/v1";
        this.startServer();
        this.middleWare();
        this.connectDb();
        this.health();
        this.instantiateRoutes();
        this.app.use(this.GlobalErrorHandler());
    }
    middleWare() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        (0, dotenv_1.config)();
        return;
    }
    connectDb() {
        const database = new database_1.default();
        return database;
    }
    health() {
        this.app.get("/health-check", (req, res, next) => {
            res.status(200).json({
                success: true,
                message: "Welcome to hostel-manager API",
            });
        });
    }
    instantiateRoutes() {
        let routes = [new auth_1.default(), new hostel_1.default(), new agent_1.default()];
        routes.forEach((router) => {
            this.app.use(this.apiVersion, router["router"]);
        });
    }
    GlobalErrorHandler() {
        return (err, req, res, next) => {
            console.log(err);
            if (err) {
                if (err.name == "ZodError")
                    return globalErrorHandler_1.default.HandleZodError(err, res);
                if (err.code == 11000) {
                    return globalErrorHandler_1.default.HandleDuplicateError(err, res);
                }
                res.status(err.statusCode || 500).json({
                    success: false,
                    message: err.message || "An Error occured",
                    error: err,
                });
            }
            else {
                return next();
            }
        };
    }
    startServer() {
        return this.app.listen(+config_1.default.PORT, () => {
            console.log(`Server is running on port ${config_1.default.PORT}`);
        });
    }
}
new Server();
