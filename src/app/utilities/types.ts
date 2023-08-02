import { Router } from "express";

export interface IRoutes {
  path: string;
  router: Router;
}

export interface IResponseType {
  status: number;
  message: string;
  data: any;
}
