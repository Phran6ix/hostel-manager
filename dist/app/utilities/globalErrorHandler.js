"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static HandleZodError(err, res) {
        res.status(400).json({
            success: false,
            message: err.issues.map((issue) => issue.message),
        });
    }
    static HandleDuplicateError(err, res) {
        res.status(400).json({
            success: false,
            message: `${Object.keys(err.keyValue)} already exists`
        });
    }
}
exports.default = ErrorHandler;
