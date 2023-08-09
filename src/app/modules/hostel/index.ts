import { Router } from "express";

import HostelController from "./controller";
import HostelValidation from "./validation";
import { HelperFunctions } from "../../utilities/helper";
let validate = HelperFunctions.validate;

export default class HostelRoutes {
  public path = "/hostels";
  public router: Router;
  constructor() {
    this.router = Router();
  }

  private instantiateRoutes() {
    this.router.post(`${this.path}`, validate(HostelValidation.create_hoste_validation), (...x) =>
      new HostelController(...x).HTTPCreateAnHostel()
    );
    this.router.get(`${this.path}`, validate(HostelValidation.get_all_hostel), (...x) =>
      new HostelController(...x).HTTPGetAllHostels()
    );
    this.router.get(`${this.path}/:hostelId`, validate(HostelValidation.get_a_hostel), (...x) =>
      new HostelController(...x).HTTPGetAHostel()
    );
    this.router.patch(
      `${this.path}/update-hostel`,
      validate(HostelValidation.update_hostel),
      (...x) => new HostelController(...x).HTTPUpdateHostel()
    );
    this.router.delete(
      `${this.path}/delete-hostel/:hostelId`,
      validate(HostelValidation.delete_hostel),
      (...x) => new HostelController(...x).HTTPDeleteHostel()
    );
  }
}
