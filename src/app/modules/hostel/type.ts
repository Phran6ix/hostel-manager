import { Model } from "sequelize";

export enum HostelTypeEnum {
  SINGLE = "Single room",
  SELF_CON = "Self con",
  ROOM_PALOUR = "Room and Palour",
  TWO_BEDROOM = "Two bedroom flat",
}
export interface HostelInterface extends Model {
  hostelId: string;
  name: string;
  price: number;
  location: string;
  address: string;
  images: string[];
  type: HostelTypeEnum;
  createdAt?: Date;
}
