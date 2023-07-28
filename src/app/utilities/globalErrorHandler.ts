import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
  public static HandleZodError(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(400).json({
      success: false,
      message: err.issues.map((issue: any) => issue.message),
    });
  }
}
