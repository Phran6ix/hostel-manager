import mongoose from "mongoose";
import sequelize from "./connect_sequelize";

import Config from "../utilities/config";
import Constants from "../utilities/constant";

export default class Database {
  constructor() {
    this.connectMongoose();
    this.connectSequelize();
  }

  private connectMongoose() {
    if (Config.NODE_ENV == Constants.NODE_ENVIRONMENT["DEVELOPMENT"]) {
      return mongoose
        .connect(`mongodb://${Config.MONGO_HOST}:${Config.MONGO_PORT}/hoster-manager`)
        .then(() => {
          console.log(`MongoDB connected on port ${Config.MONGO_PORT}`);
        })
        .catch((error: any) => {
          console.error(`MongoDB connection failed , ${error}`);
        });
    } else if (Config.NODE_ENV == Constants.NODE_ENVIRONMENT["PRODUCTION"] && !!Config.MONGO_URI) {
      return mongoose
        .connect(Config.MONGO_URI)
        .then(() => {
          console.log("MongoDB database connection successful");
        })
        .catch((error: any) => {
          console.error(`MongoDB connection failed , ${error}`);
        });
    } else {
      console.log("......MONGO CONNECTION FAILED......");
    }
  }

  public connectSequelize() {
    // sequelize
    //   .authenticate()
    //   .then(() => console.log(`Database connected successfully`))
    //   .catch((error) => {
    //     console.log("postgres error");
    //     console.error(`Database connection failed, ${error}`);

    //   });

    sequelize
      .sync({ alter: true })
      .then(() => {
        console.log("Sequelize Database connected successfully");
      })
      .catch((error) => {
        console.log("Sequelize connection failed", error);
      });
  }
}
