import { Sequelize } from "sequelize";
import Config from "../utilities/config";

const sequelize = new Sequelize(
  `postgres://${Config.POSTGRES_USER}:${Config.POSTGRES_PASSWORD}@${Config.POSTGRES_HOST}:5432/${Config.POSTGRES_DB}`,
  { dialect: "postgres" }
);

export default sequelize;
