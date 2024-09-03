import express from "express";
import { Response } from "express";
import { BlogService } from "./blog.service";
import {
  createBlogValidation,
  validateRequestBlogBody,
} from "./validation/createBlog.validation";
import { validationError } from "../middlewares/errorHandler";
import { authentication } from "../middlewares/athentication";
import { BlogCnontroller } from "./blog.controller";
import { validateBlogUUID } from "./validation/uuid-blog-validation";
import { CustomRequest } from "../custom-request";
import { pagination } from "../middlewares/pagination";

export const blogRouter = express.Router();
const blogService = new BlogService();
const blogController = new BlogCnontroller(blogService);

blogRouter.post(
  "/blog",
  authentication,
  createBlogValidation,
  validateRequestBlogBody,
  validationError,
  async (req: CustomRequest, res: Response) => {
    return await blogController.createBlog(req, res);
  }
);

blogRouter.get(
  "/blog/:blogId",
  validateBlogUUID,
  async (req: CustomRequest, res: Response) => {
    return await blogController.getBlog(req, res);
  }
);

blogRouter.get(
  "/blogs",
  pagination,
  async (req: CustomRequest, res: Response) => {
    return await blogController.getAllBlogs(req, res);
  }
);

blogRouter.put(
  "/blog/:blogId",
  validateBlogUUID,
  authentication,
  createBlogValidation,
  validateRequestBlogBody,
  validationError,
  async (req: CustomRequest, res: Response) => {
    return await blogController.updateBlog(req, res);
  }
);

blogRouter.delete(
  "/blog/:blogId",
  validateBlogUUID,
  authentication,
  async (req: CustomRequest, res: Response) => {
    return await blogController.deleteBlog(req, res);
  }
);
