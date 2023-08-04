import { ModelStatic } from "sequelize";
import { Hostel } from "./model";
import { HostelInterface } from "./type";
import { HelperFunctions } from "../../utilities/helper";
import { NotFoundError } from "../../utilities/error";

export default class HostelRepository {
  public hostel_model: ModelStatic<HostelInterface>;

  constructor() {
    this.hostel_model = Hostel;
  }

  public async createHostel(props: Partial<HostelInterface>): Promise<HostelInterface> {
    try {
      const hostel = await this.hostel_model.create(props);
      return hostel;
    } catch (error) {
      throw error;
    }
  }

  public async GetAllHostel(props: {
    limit?: number;
    page?: number;
  }): Promise<{ hostels: HostelInterface[]; total: number }> {
    try {
      let filterPaginate: any = {};
      if (props.limit || props.page) {
        filterPaginate = { page: props.page, limit: props.limit };
      }

      const { rows, count } = await this.hostel_model.findAndCountAll({
        ...HelperFunctions.paginate({ ...filterPaginate }),
      });
      return { total: count, hostels: rows };
    } catch (error) {
      throw error;
    }
  }

  public async GetAHostel(props: { hostelId: string }): Promise<HostelInterface> {
    try {
      const hostel = await this.hostel_model.findOne({
        where: {
          hostelId: props.hostelId,
        },
      });
      if (!hostel) throw NotFoundError("Hostel not Found");
      return hostel;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateHostel(props: {
    hostelId: string;
    data: Partial<HostelInterface>;
  }): Promise<any> {
    try {
      const hostel = await this.hostel_model.update(
        { ...props.data },
        { where: { hostelId: props.hostelId } }
      );
      console.log(hostel);
      if (!hostel) throw NotFoundError("Hostel not found");

      return hostel;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteHostel(props: { hostelId: string }): Promise<void> {
    try {
      let hostel = await this.hostel_model.destroy({ where: { hostelId: props.hostelId } });
      console.log(hostel);
      return;
    } catch (error) {
      throw error;
    }
  }
}
