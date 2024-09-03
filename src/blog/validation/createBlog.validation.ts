import { check } from "express-validator";
import { Response, Request, NextFunction } from "express";

export const createBlogValidation = [
  check("title")
    .exists()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("title must be between 3 and 30 characters"),

  check("content")
    .exists()
    .withMessage("Content is required")
    .isString()
    .withMessage("content must be string"),
];

export const validateRequestBlogBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedProperties = ["title", "content"];
  const requestKeys = Object.keys(req.body);

  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error: "Only title and content are allowed in the request body.",
    });
  }

  next();
};
