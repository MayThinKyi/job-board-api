import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { handleErrorResponse } from "../utils/errors";
import { sendSuccessResponse } from "../utils/responseHelper";
import { Types } from "mongoose";

export class UserController {
  private service;
  constructor() {
    this.service = new UserService();
  }
  getMe = async (req: Request, res: Response) => {
    try {
      const { _id } = (req as any).user;
      const data = await this.service.getMe(_id);
      sendSuccessResponse(res, 200, "Retrived user successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  updateUserInfo = async (req: Request, res: Response) => {
    try {
      const { _id } = (req as any).user;
      const data = await this.service.updateUserInfo(_id, req.body);
      sendSuccessResponse(res, 200, "Updated user info successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  toggleFavouriteJob = async (req: Request, res: Response) => {
    try {
      const { jobId } = req.body;
      const { _id } = (req as any).user;
      const data = await this.service.toggleFavouriteJob(jobId, _id);
      sendSuccessResponse(
        res,
        200,
        "Updated user favourites successfully",
        data,
      );
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  getMeFavouriteJobs = async (req: Request, res: Response) => {
    try {
      const { _id } = (req as any).user;
      const data = await this.service.getMeFavouriteJobs(_id);
      sendSuccessResponse(
        res,
        200,
        "Updated user favourites job successfully",
        data,
      );
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
}
