import mongoose from "mongoose";
import { Sequelize } from "sequelize";

import Config from "../utilities/config";
import Constants from "../utilities/constant";

export default class Database {
  constructor() {
    this.connectMongoose();
    this.connectSequelize();
  }

  connectMongoose() {
    if (Config.NODE_ENV == Constants.NODE_ENVIRONMENT["DEVELOPMENT"]) {
      return mongoose
        .connect(`mongodb://${Config.MONGO_HOST}:${Config.MONGO_PORT}/hoster-manager`)
        .then(() => {
          console.log(`MongoDB connected on port ${Config.MONGO_PORT}`);
        })
        .catch((error: any) => {
          console.error(`MongoDB connection failed , ${error}`);
        });
    } else if (Config.NODE_ENV == Constants.NODE_ENVIRONMENT["PRODUCTION"] && Config.MONGO_URL) {
      return mongoose
        .connect(Config.MONGO_URL)
        .then(() => {
          console.log("MongoDB database connection");
        })
        .catch((error: any) => {
          console.error(`MongoDB connection failed , ${error}`);
        });
    }
  }

  connectSequelize() {
    // let sequelize = new Sequelize(
    //   `${Config.MYSQL_DATABASE}`,
    //   "root",
    //   `${Config.MYSQL_PASSWORD}`,
    //   {
    //     host: Config.MYSQL_HOST,
    //     port: 3306,
    //     dialect: "mysql",
    //   }
    // )
    let sequelize = new Sequelize(
      `postgres://${Config.POSTGRES_USER}:${Config.POSTGRES_PASSWORD}@${Config.POSTGRES_HOST}:5432/${Config.POSTGRES_DB}`,
      { dialect: "postgres" }
    );

    sequelize
      .authenticate()
      .then(() => console.log(`Database connected successfully`))
      .catch((error) => {
        console.log("postgres error");
        console.error(`Database connection failed, ${error}`);
      });

    return sequelize;
  }
}
