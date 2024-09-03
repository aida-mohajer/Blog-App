import express, { Request } from "express";
import { Response } from "express";
import { UserController } from "./user.controller";
import { validationError } from "../middlewares/errorHandler";
import { UserService } from "./user.service";
import {
  signupValidation,
  validateSignupRequestBody,
} from "./validation/signup.validation";
import {
  loginValidation,
  validateLoginRequestBody,
} from "./validation/login.validation";
import { authentication } from "../middlewares/athentication";

export const userRouter = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.post(
  "/signup",
  signupValidation,
  validateSignupRequestBody,
  validationError,
  async (req: Request, res: Response) => {
    return userController.signup(req, res);
  }
);

userRouter.post(
  "/login",
  loginValidation,
  validateLoginRequestBody,
  validationError,
  async (req: Request, res: Response) => {
    return userController.login(req, res);
  }
);

userRouter.delete(
  "/delete-user",
  authentication,
  validationError,
  async (req: Request, res: Response) => {
    return userController.deleteUser(req, res);
  }
);
