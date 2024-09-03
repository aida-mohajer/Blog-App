import { Request, Response } from "express";
import { LikeService } from "./like.service";
import { CustomRequest } from "../custom-request";

export class LikeController {
  constructor(private likeService: LikeService) {}
  async likeNews(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    const blogId = req.params.blogId;

    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.likeService.likeBlog(userId, blogId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: result.message,
      like: result.likeCount,
    });
  }
}
