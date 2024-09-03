import { Response } from "express";
import { BlogDto } from "./dto/blog.dto";
import { CustomRequest } from "../custom-request";
import { BlogService } from "./blog.service";

export class BlogCnontroller {
  constructor(private blogService: BlogService) {}

  async createBlog(req: CustomRequest, res: Response): Promise<Response> {
    const data: BlogDto = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const result = await this.blogService.createBlog(data, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
  }

  async getBlog(req: CustomRequest, res: Response): Promise<Response> {
    const blogId = req.params.blogId;
    const result = await this.blogService.getBlog(blogId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllBlogs(req: CustomRequest, res: Response): Promise<Response> {
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    try {
      const result = await this.blogService.getAllBlogs(pagination);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving blogs:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateBlog(req: CustomRequest, res: Response): Promise<Response> {
    const data: BlogDto = req.body;
    const userId = req.user?.userId;
    const blogId = req.params.blogId;

    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.blogService.updateBlog(data, userId, blogId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
  }

  async deleteBlog(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    const blogId = req.params.blogId;

    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.blogService.deleteBlog(blogId, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: result.message,
    });
  }
}
