import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import HostelService from "./service";

export default class HostelController extends BaseController {
  public hostel_service;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.hostel_service = new HostelService();
  }

  public async HTTPCreateAnHostel(): Promise<any> {
    try {
      const data = await this.hostel_service.CreateHostel(this.req.body);
      return this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPGetAllHostels(): Promise<any> {
    try {
      const data = await this.hostel_service.GetAllHostel(this.req.query);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPGetAHostel(): Promise<any> {
    try {
      const data = await this.hostel_service.GetAHostel({ hostelId: this.req.params.hostelId });
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPUpdateHostel(): Promise<any> {
    try {
      const data = await this.hostel_service.UpdateHostel(this.req.body);
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPDeleteHostel(): Promise<any> {
    try {
      const data = await this.hostel_service.DeleteHostel({ hostelId: this.req.params.hostelId });
    } catch (error) {
      this.next(error);
    }
  }
}
