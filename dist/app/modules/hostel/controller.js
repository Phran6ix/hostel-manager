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
const baseController_1 = __importDefault(require("../baseController"));
const service_1 = __importDefault(require("./service"));
class HostelController extends baseController_1.default {
    constructor(req, res, next) {
        super(req, res, next);
        this.hostel_service = new service_1.default();
    }
    HTTPCreateAnHostel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hostel_service.CreateHostel(Object.assign({ user: this.req.user }, this.req.body));
                return this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPGetAllHostels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hostel_service.GetAllHostel(this.req.query);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPGetAHostel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hostel_service.GetAHostel({ hostelId: this.req.params.hostelId });
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPUpdateHostel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hostel_service.UpdateHostel(this.req.body);
                this.responseHandler(data);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
    HTTPDeleteHostel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.hostel_service.DeleteHostel({ hostelId: this.req.params.hostelId });
            }
            catch (error) {
                this.next(error);
            }
        });
    }
}
exports.default = HostelController;
