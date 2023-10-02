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
exports.redisClient = void 0;
const redis_1 = require("redis");
const config_1 = __importDefault(require("../utilities/config"));
let redisClient;
if (config_1.default.NODE_ENV == 'production') {
    exports.redisClient = redisClient = (0, redis_1.createClient)({ url: config_1.default.REDIS_URL });
}
else {
    exports.redisClient = redisClient = (0, redis_1.createClient)({
        socket: { host: config_1.default.REDIS_HOST, port: +config_1.default.REDIS_PORT },
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    redisClient.on("connect", () => {
        console.log(`Redis connected Successfully`);
    });
    redisClient.on("error", (error) => {
        console.log(`Redis connection failed -- ${error}`);
    });
    yield redisClient.connect();
}))();
