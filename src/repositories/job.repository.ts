import { Types } from "mongoose";
import { JobModel } from "../models/job.model";
import { CreateJobDTO, IJob, UpdateJobDTO } from "../types/job";

export class JobRepository {
  private db;
  constructor() {
    this.db = JobModel;
  }
  findAll = async (): Promise<IJob[]> => {
    return this.db.find();
  };
  findById = async (id: Types.ObjectId): Promise<IJob | null> => {
    return this.db.findById(id);
  };
  findByTitle = async (title: string): Promise<IJob | null> => {
    return this.db.findOne({ title });
  };
  create = async (body: CreateJobDTO): Promise<IJob> => {
    return this.db.create(body) as unknown as IJob;
  };
  update = async (id: Types.ObjectId, body: UpdateJobDTO): Promise<IJob> => {
    return this.db.findByIdAndUpdate(id, body, {
      new: true,
    }) as unknown as IJob;
  };
  delete = async (id: Types.ObjectId): Promise<null> => {
    return this.db.findByIdAndDelete(id);
  };
}
