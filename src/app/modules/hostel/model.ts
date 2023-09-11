import { DataTypes } from "sequelize";
import Constants from "../../utilities/constant";
import { HostelInterface } from "./type";
import Database from "../../services/database";
import { HelperFunctions } from "../../utilities/helper";
// import sequelize from "../../services/connect_sequelize";

let sequelize = Database.sequelize;

const Hostel = sequelize.define<HostelInterface>(
  "Hostel",
  {
    hostelId: {
      type: DataTypes.UUID,
      defaultValue: HelperFunctions.UUID(),
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(Constants.HOSTEL_TYPE)),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export { Hostel };
