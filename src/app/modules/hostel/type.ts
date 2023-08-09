import { Model } from "sequelize";
import Constants from "../../utilities/constant";

type ObjectValues<T> = T[keyof T]
export type HostelType = ObjectValues<typeof Constants.HOSTEL_TYPE>

export interface HostelInterface extends Model {
  hostelId: string;
  name: string;
  price: number;
  location: string;
  address: string;
  images: string[];
  type: HostelType
  
  createdAt?: Date;
}

