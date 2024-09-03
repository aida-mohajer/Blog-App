import { Request } from "express";
import { Pagination } from "./middlewares/pagination";

export interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
  pagination?: Pagination;
}
