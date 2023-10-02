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
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const helper_1 = require("../../utilities/helper");
const error_1 = require("../../utilities/error");
class HostelRepository {
    constructor() {
        this.hostel_model = model_1.Hostel;
    }
    createHostel(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hostel = yield this.hostel_model.create(props);
                return hostel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAllHostel(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filterPaginate = {};
                if (props.limit || props.page) {
                    filterPaginate = { page: props.page, limit: props.limit };
                }
                const { rows, count } = yield this.hostel_model.findAndCountAll(Object.assign({}, helper_1.HelperFunctions.paginate(Object.assign({}, filterPaginate))));
                return { total: count, hostels: rows };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetAHostel(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hostel = yield this.hostel_model.findOne({
                    where: {
                        hostelId: props.hostelId,
                    },
                });
                if (!hostel)
                    throw (0, error_1.NotFoundError)("Hostel not Found");
                return hostel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateHostel(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hostel = yield this.hostel_model.update(Object.assign({}, props.data), { where: { hostelId: props.hostelId } });
                console.log(hostel);
                if (!hostel)
                    throw (0, error_1.NotFoundError)("Hostel not found");
                return hostel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    DeleteHostel(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hostel = yield this.hostel_model.destroy({ where: { hostelId: props.hostelId } });
                console.log(hostel);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = HostelRepository;
