import HostelRepository from "./repository";
import { HostelInterface, HostelTypeEnum } from "./type";
import { IResponseType } from "../../utilities/types";

export default class HostelService {
  public hostel_repo;

  constructor() {
    this.hostel_repo = new HostelRepository();
  }

  public async CreateHostel(data: {
    name: string;
    price: number;
    location: string;
    address: string;
    images: string[];
    type: HostelTypeEnum;
  }): Promise<IResponseType> {
    return {
      status: 201,
      message: "Hostel has been created",
      data: await this.hostel_repo.createHostel(data),
    };
  }

  public async GetAllHostel(data: { limit: number; page: number }): Promise<IResponseType> {
    return {
      status: 200,
      message: "Hostels information fetched",
      data: await this.hostel_repo.GetAllHostel(data),
    };
  }
  public async GetAHostel(data: { hostelId: string }): Promise<IResponseType> {
    return {
      status: 200,
      message: "Hostel data fetched",
      data: await this.hostel_repo.GetAHostel(data),
    };
  }
  public async UpdateHostel(data: {
    hostelId: string;
    data: Partial<HostelInterface>;
  }): Promise<IResponseType> {
    return {
      status: 200,
      message: "Hostel Data updated successfully",
      data: await this.hostel_repo.UpdateHostel(data),
    };
  }
  public async DeleteHostel(data: { hostelId: string }): Promise<IResponseType> {
    await this.hostel_repo.DeleteHostel(data);
    return {
      status: 204,
      message: "Hostel deleted successfully",
      data: null,
    };
  }
}
