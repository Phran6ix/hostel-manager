import { Router } from "express";

import HostelController from "./controller";
import HostelValidation from "./validation";
import { HelperFunctions } from "../../utilities/helper";
import Constants from "../../utilities/constant";
let validate = HelperFunctions.validate;

export default class HostelRoutes {
  public path = "/hostels";
  public router: Router;
  constructor() {
    this.router = Router();
    this.instantiateRoutes();
  }

  private instantiateRoutes() {
    this.router.post(
      `${this.path}`,
      validate(HostelValidation.create_hoste_validation),
      HelperFunctions.protect,
      HelperFunctions.validateRole(Constants.USER_ROLES["AGENT"]),
      (...x) => new HostelController(...x).HTTPCreateAnHostel()
    );
    this.router.get(
      `${this.path}`,
      validate(HostelValidation.get_all_hostel),
      HelperFunctions.protect,
      (...x) => new HostelController(...x).HTTPGetAllHostels()
    );
    this.router.get(
      `${this.path}/:hostelId`,
      validate(HostelValidation.get_a_hostel),
      HelperFunctions.protect,
      (...x) => new HostelController(...x).HTTPGetAHostel()
    );
    this.router.patch(
      `${this.path}/update-hostel`,
      validate(HostelValidation.update_hostel),
      HelperFunctions.protect,
      HelperFunctions.validateRole(Constants.USER_ROLES["AGENT"]),
      (...x) => new HostelController(...x).HTTPUpdateHostel()
    );
    this.router.delete(
      `${this.path}/delete-hostel/:hostelId`,
      validate(HostelValidation.delete_hostel),
      HelperFunctions.protect,
      HelperFunctions.validateRole(Constants.USER_ROLES["AGENT"]),
      (...x) => new HostelController(...x).HTTPDeleteHostel()
    );
  }
}
