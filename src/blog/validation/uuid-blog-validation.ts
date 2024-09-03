import { Request, Response, NextFunction } from "express";

export const validateBlogUUID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.blogId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(blogId)) {
    return res.status(400).json({
      error: "Invalid blogId format. Please provide a valid UUID.",
    });
  }

  next();
};
