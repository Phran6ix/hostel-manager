import { z } from "zod";
import Constants from "../../utilities/constant";

class HostelValidation {
  static create_hoste_validation = z.object({
    body: z.object({
      name: z.string({ required_error: "Hostel {{name}} is required" }).trim(),
      price: z.number({ required_error: "Hostel {{price}} is required" }),
      location: z.string({ required_error: "{{location}} is required" }).trim(),
      address: z.string({ required_error: "Hostel {{adress}} is required" }).trim(),
      images: z.array(z.string()).nonempty().max(6, "maximum number of images reached"),
      type: z.nativeEnum(Constants.HOSTEL_TYPE, { required_error: "Hostel {{type}} is required" }),
    }),
    headers: z.object({
      authorization: z.string({ required_error: "You are not signed in" }),
    }),
  });

  static get_all_hostel = z.object({
    query: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
  });

  static get_a_hostel = z.object({
    params: z.object({
      hostelId: z.string({ required_error: "Input the hostelId" }),
    }),
  });

  static update_hostel = z.object({
    body: z.object({
      hostelId: z.string({ required_error: "Input the hostelId" }),
      name: z.string({ required_error: "Hostel name is required" }).trim().optional(),
      price: z.number({ required_error: "Hostel price is required" }).optional(),
      location: z.string({ required_error: "Location is required" }).trim().optional(),
      images: z.array(z.string()).nonempty().min(6, "Maximum number of images reached").optional(),
      type: z
        .nativeEnum(Constants.HOSTEL_TYPE, { required_error: "Hostel is required" })
        .optional(),
    }),
  });

  static delete_hostel = z.object({
    params: z.object({
      hostelId: z.string({ required_error: "Input the hostelId" }),
    }),
  });
}

export default HostelValidation;
