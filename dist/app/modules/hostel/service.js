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
const repository_1 = __importDefault(require("./repository"));
class HostelService {
    constructor() {
        this.hostel_repo = new repository_1.default();
    }
    CreateHostel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 201,
                message: "Hostel has been created",
                data: yield this.hostel_repo.createHostel(data),
            };
        });
    }
    GetAllHostel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "Hostels information fetched",
                data: yield this.hostel_repo.GetAllHostel(data),
            };
        });
    }
    GetAHostel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "Hostel data fetched",
                data: yield this.hostel_repo.GetAHostel(data),
            };
        });
    }
    UpdateHostel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                message: "Hostel Data updated successfully",
                data: yield this.hostel_repo.UpdateHostel(data),
            };
        });
    }
    DeleteHostel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.hostel_repo.DeleteHostel(data);
            return {
                status: 204,
                message: "Hostel deleted successfully",
                data: null,
            };
        });
    }
}
exports.default = HostelService;
