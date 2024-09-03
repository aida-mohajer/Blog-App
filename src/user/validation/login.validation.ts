import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const loginValidation = [
  check("userName")
    .exists()
    .withMessage("username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),

  check("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters long"),
];

export const validateLoginRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedProperties = ["userName", "password"];
  const requestKeys = Object.keys(req.body);

  // Check if there are any unexpected properties
  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error: "Only userName,password are allowed in the request body.",
    });
  }

  next();
};
