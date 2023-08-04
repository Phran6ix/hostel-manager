import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import HostelService from "./service";

export default class HostelController extends BaseController {
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }
}
