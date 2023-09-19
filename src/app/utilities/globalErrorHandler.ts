import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
  public static HandleZodError(err: any, res: Response) {
    res.status(400).json({
      success: false,
      message: err.issues.map((issue: any) => issue.message),
    });
  }

  public static HandleDuplicateError(err: any, res: Response,) {
    res.status(400).json({
      success: false,
      message: `${Object.keys(err.keyValue)} already exists`
    })
  }
}
