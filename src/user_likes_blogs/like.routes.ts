import express from "express";
import { Response } from "express";
import { LikeController } from "./like.controller";
import { authentication } from "../middlewares/athentication";
import { validationError } from "../middlewares/errorHandler";
import { LikeService } from "./like.service";
import { validateBlogUUID } from "../blog/validation/uuid-blog-validation";
import { CustomRequest } from "../custom-request";

export const likeRouter = express.Router();
const likeService = new LikeService();
const likeController = new LikeController(likeService);

likeRouter.get(
  "/toggleLike/:blogId",
  validateBlogUUID,
  authentication,
  validationError,
  async (req: CustomRequest, res: Response) => {
    return await likeController.likeNews(req, res);
  }
);
