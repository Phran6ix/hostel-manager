import { Request, Response, NextFunction } from "express";
import { IResponseType } from "../utilities/types";

abstract class BaseController {
  req: Request;
  res: Response;
  next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  protected responseHandler(data: IResponseType): Response {
    return this.res.status(data["status"]).json({
      success: true,
      message: data["message"],
      data: data["data"],
    });
  }
}

export default BaseController;
