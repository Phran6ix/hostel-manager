"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    responseHandler(data) {
        return this.res.status(data["status"]).json({
            success: true,
            message: data["message"],
            data: data["data"],
        });
    }
}
exports.default = BaseController;
