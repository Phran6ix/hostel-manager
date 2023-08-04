import { DataType, DataTypes } from "sequelize";
import { HostelInterface } from "./type";
import Database from "../../services/database";
import { HelperFunctions } from "../../utilities/helper";
const sequelize = Database.SequelizeClient;

const Hostel = sequelize.define<HostelInterface>(
  "Hostel",
  {
    hostelId: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: HelperFunctions.UUID(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export { Hostel };
