import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { handleErrorResponse } from "../utils/errors";
import { sendSuccessResponse } from "../utils/responseHelper";
import { createUserSchema } from "../schema/user.schema";

export class AuthController {
  private service;
  constructor() {
    this.service = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = await createUserSchema.parseAsync(req.body);
      const data = await this.service.register({ email, password });
      sendSuccessResponse(res, 201, "User registered successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = await createUserSchema.parseAsync(req.body);
      const data = await this.service.login({ email, password });
      sendSuccessResponse(res, 201, "User login successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
}
