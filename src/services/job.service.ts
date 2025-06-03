import { Types } from "mongoose";
import { JobRepository } from "../repositories/job.repository";
import Logger from "../utils/logger";
import { CreateJobDTO, IJob, UpdateJobDTO } from "../types/job";

export class JobService {
  private repository;
  constructor() {
    this.repository = new JobRepository();
  }
  getAllJobs = async (): Promise<IJob[]> => {
    try {
      const data = await this.repository.findAll();
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getAllJobs ) => ${error}`);
      throw new Error(error.message);
    }
  };
  getJobById = async (id: Types.ObjectId): Promise<IJob | null> => {
    try {
      const data = await this.repository.findById(id);
      if (!data) {
        throw new Error("Job not exist");
      }
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getJobById ) => ${error}`);
      throw new Error(error.message);
    }
  };
  createJob = async (body: CreateJobDTO): Promise<IJob> => {
    try {
      const existingJobWithSameTitle = await this.repository.findByTitle(
        body.title,
      );
      if (existingJobWithSameTitle) {
        throw new Error("Job with current title already exist");
      }
      const data = await this.repository.create(body);
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( createJob ) => ${error}`);
      throw new Error(error.message);
    }
  };
  updateJob = async (id: Types.ObjectId, body: UpdateJobDTO): Promise<IJob> => {
    try {
      const existingJob = await this.repository.findById(id);
      if (!existingJob) {
        throw new Error("Job not exist");
      }
      const existingJobWithSameTitle = await this.repository.findByTitle(
        body.title!,
      );
      if (
        existingJobWithSameTitle &&
        !existingJobWithSameTitle._id.equals(id)
      ) {
        throw new Error("Job Title already exist");
      }
      const data = await this.repository.update(id, body);
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( updateJob ) => ${error}`);
      throw new Error(error.message);
    }
  };
  deleteJob = async (id: Types.ObjectId): Promise<void> => {
    try {
      const existingJob = await this.repository.findById(id);
      if (!existingJob) {
        throw new Error("Job not exist");
      }
      await this.repository.delete(id);
    } catch (error: any) {
      Logger.error(`Service error at ( deleteJob ) => ${error}`);
      throw new Error(error.message);
    }
  };
}
