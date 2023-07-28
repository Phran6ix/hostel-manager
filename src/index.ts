import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import Config from "./app/utilities/config";
import Database from "./app/services/database";
import { IRoutes } from "./app/utilities/types";
// ROUTES
import UserRouter from "./app/modules/auth";
import { HTTPErrorType } from "./app/utilities/error";
import ErrorHandler from "./app/utilities/globalErrorHandler";

class Server {
  private app = express();
  private apiVersion = "/v1";
  constructor() {
    this.middleWare();
    this.connectDb();
    this.health();
    this.instatiateRoutes();
    this.app.use(this.GlobalErrorHandler());

    this.startServer();
  }

  private middleWare() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));

    config();

    return;
  }
  private connectDb() {
    const database = new Database();
    return database;
  }

  private health() {
    this.app.get("/health-check", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        success: true,
        message: "Welcome to hostel-manager API",
      });
    });
  }

  private instatiateRoutes() {
    let routes: IRoutes[] = [new UserRouter()];

    routes.forEach((router) => {
      this.app.use(this.apiVersion, router["router"]);
    });
  }

  private GlobalErrorHandler() {
    return (err: HTTPErrorType, req: Request, res: Response, next: NextFunction) => {
      if (err) {
        if (err.name == "ZodError") return ErrorHandler.HandleZodError(err, req, res, next);
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "An Error occured",
          error: err,
        });
      } else {
        return next();
      }
    };
  }

  public startServer() {
    return this.app.listen(+Config.PORT, () => {
      console.log(`Server is running on port ${Config.PORT}`);
    });
  }
}

new Server();
