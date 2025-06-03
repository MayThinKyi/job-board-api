import { Request, Response } from "express";
import { JobService } from "../services/job.service";
import { handleErrorResponse } from "../utils/errors";
import { sendSuccessResponse } from "../utils/responseHelper";
import mongoose from "mongoose";
import { createJobSchema, updateJobSchema } from "../schema/job.schema";

export class JobController {
  private service;
  constructor() {
    this.service = new JobService();
  }
  getAllJobs = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getAllJobs();
      sendSuccessResponse(res, 200, "Retrieved jobs successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  getJobById = async (req: Request, res: Response) => {
    try {
      const { jobId } = req.params;
      const objectId = new mongoose.Types.ObjectId(jobId);

      const data = await this.service.getJobById(objectId);
      sendSuccessResponse(res, 200, "Retrieved job successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  createJob = async (req: Request, res: Response) => {
    try {
      const body = await createJobSchema.parseAsync(req.body);
      const data = await this.service.createJob({
        ...body,
      });
      sendSuccessResponse(res, 201, "Created job successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  updateJob = async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const objectId = new mongoose.Types.ObjectId(jobId);
    try {
      const body = await updateJobSchema.parseAsync(req.body);
      const data = await this.service.updateJob(objectId, {
        _id: objectId,
        ...body,
      });
      sendSuccessResponse(res, 200, "Updated job successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  deleteJob = async (req: Request, res: Response) => {
    try {
      const { jobId } = req.params;
      const objectId = new mongoose.Types.ObjectId(jobId);
      await this.service.deleteJob(objectId);
      sendSuccessResponse(res, 204, "Deleted job successfully", null);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
}
