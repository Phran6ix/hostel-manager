import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import HostelService from "./service";
import { AgentInterface } from "../agent/type";

export default class HostelController extends BaseController {
  public hostel_service;
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.hostel_service = new HostelService();
  }

  public async HTTPCreateAnHostel(): Promise<any> {
    try {
      const agent = this.req.user as AgentInterface;
      console.log(typeof this.req.user);
      const data = await this.hostel_service.CreateHostel({
        createdBy: agent.agentId,
        ...this.req.body,
      });
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
      const data = await this.hostel_service.GetAHostel({
        hostelId: this.req.params.hostelId,
      });
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPUpdateHostel(): Promise<any> {
    try {
            const {hostelId , ...body} = this.req.body
      const data = await this.hostel_service.UpdateHostel({hostelId, data: {...body}});
      this.responseHandler(data);
    } catch (error) {
      this.next(error);
    }
  }

  public async HTTPDeleteHostel(): Promise<any> {
    try {
      const data = await this.hostel_service.DeleteHostel({
        hostelId: this.req.params.hostelId,
      });
            this.responseHandler(data)
    } catch (error) {
      this.next(error);
    }
  }
}
