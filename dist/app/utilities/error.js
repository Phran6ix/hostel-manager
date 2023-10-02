"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatusError = exports.InvalidRequestError = exports.VerificatioError = exports.AuthorizedError = exports.InvalidTokenError = exports.NotFoundError = exports.ExistError = exports.HTTPErrorType = void 0;
class HTTPErrorType extends Error {
    constructor(statusCode, name, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.success = `${this.statusCode}`.startsWith("4") ? `Fail` : `Error`;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HTTPErrorType = HTTPErrorType;
const ExistError = (message) => new HTTPErrorType(400, "Duplicate Error", message);
exports.ExistError = ExistError;
const NotFoundError = (message) => new HTTPErrorType(404, "Account Not Found", message);
exports.NotFoundError = NotFoundError;
const InvalidTokenError = (message) => new HTTPErrorType(400, "Invalid Token", message);
exports.InvalidTokenError = InvalidTokenError;
const AuthorizedError = (message) => new HTTPErrorType(401, "Unauthorized", message);
exports.AuthorizedError = AuthorizedError;
const VerificatioError = (message) => new HTTPErrorType(400, message, "Verification Error");
exports.VerificatioError = VerificatioError;
const InvalidRequestError = (message) => new HTTPErrorType(400, "Invalid Request", message);
exports.InvalidRequestError = InvalidRequestError;
const AccountStatusError = (message) => new HTTPErrorType(400, "Account Error", message);
exports.AccountStatusError = AccountStatusError;
