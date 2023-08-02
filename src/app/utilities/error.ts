export class HTTPErrorType extends Error {
  statusCode: number;
  success: string;

  constructor(statusCode: number, name: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.success = `${this.statusCode}`.startsWith("4") ? `Fail` : `Error`;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const NotFoundError = (message: string) =>
  new HTTPErrorType(404, "Account Not Found", message);

export const InvalidTokenError = (message: string) =>
  new HTTPErrorType(400, "Invalid Token", message);

export const AuthorizedError = (message: string) => new HTTPErrorType(401, "Unauthorized", message);

export const VerificatioError = (message: string) =>
  new HTTPErrorType(400, message, "Verification Error");

export const InvalidRequestError = (message: string) =>
  new HTTPErrorType(400, "Invalid Request", message);

export const AccountStatusError = (message: string) =>
  new HTTPErrorType(400, "Account Error", message);
