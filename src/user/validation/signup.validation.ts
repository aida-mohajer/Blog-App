import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const signupValidation = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),

  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email address"),

  check("age")
    .exists()
    .withMessage("Age is required")
    .isInt({ min: 7, max: 120 })
    .withMessage("Age must be an integer between 7 and 120"),

  check("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters long"),
];

export const validateSignupRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedProperties = ["userName", "email", "age", "password"];
  const requestKeys = Object.keys(req.body);

  // Check if there are any unexpected properties
  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error:
        "Only userName,email,password,age are allowed in the request body.",
    });
  }

  next();
};
