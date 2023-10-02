"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const constant_1 = __importDefault(require("../../utilities/constant"));
class HostelValidation {
}
HostelValidation.create_hoste_validation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Hostel {{name}} is required" }).trim(),
        price: zod_1.z.number({ required_error: "Hostel {{price}} is required" }),
        location: zod_1.z.string({ required_error: "{{location}} is required" }).trim(),
        address: zod_1.z.string({ required_error: "Hostel {{adress}} is required" }).trim(),
        images: zod_1.z.array(zod_1.z.string()).nonempty().max(6, "maximum number of images reached"),
        type: zod_1.z.nativeEnum(constant_1.default.HOSTEL_TYPE, { required_error: "Hostel {{type}} is required" }),
    }),
    headers: zod_1.z.object({
        authorization: zod_1.z.string({ required_error: "You are not signed in" }),
    }),
});
HostelValidation.get_all_hostel = zod_1.z.object({
    query: zod_1.z.object({
        limit: zod_1.z.number().optional(),
        page: zod_1.z.number().optional(),
    }),
});
HostelValidation.get_a_hostel = zod_1.z.object({
    params: zod_1.z.object({
        hostelId: zod_1.z.string({ required_error: "Input the hostelId" }),
    }),
});
HostelValidation.update_hostel = zod_1.z.object({
    body: zod_1.z.object({
        hostelId: zod_1.z.string({ required_error: "Input the hostelId" }),
        name: zod_1.z.string({ required_error: "Hostel name is required" }).trim().optional(),
        price: zod_1.z.number({ required_error: "Hostel price is required" }).optional(),
        location: zod_1.z.string({ required_error: "Location is required" }).trim().optional(),
        images: zod_1.z.array(zod_1.z.string()).nonempty().min(6, "Maximum number of images reached").optional(),
        type: zod_1.z
            .nativeEnum(constant_1.default.HOSTEL_TYPE, { required_error: "Hostel is required" })
            .optional(),
    }),
});
HostelValidation.delete_hostel = zod_1.z.object({
    params: zod_1.z.object({
        hostelId: zod_1.z.string({ required_error: "Input the hostelId" }),
    }),
});
exports.default = HostelValidation;
