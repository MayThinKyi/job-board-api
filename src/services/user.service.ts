import { Types } from "mongoose";
import { UserRepository } from "../repositories/user.repository";
import Logger from "../utils/logger";
import { UpdateUserInfoDTO } from "../types/user";
import { JobRepository } from "../repositories/job.repository";

export class UserService {
  private jobRepository;
  private userRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.jobRepository = new JobRepository();
  }
  getMe = async (_id: Types.ObjectId) => {
    try {
      const user = await this.userRepository.findById(_id);
      if (!user) {
        throw new Error("User not exist");
      }
      return user;
    } catch (error: any) {
      Logger.error(`Service error at ( getMe ) => ${error}`);
      throw new Error(error.message);
    }
  };
  updateUserInfo = async (_id: Types.ObjectId, body: UpdateUserInfoDTO) => {
    try {
      const data = await this.userRepository.update(_id, body);
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( updateUserInfo ) => ${error}`);
      throw new Error(error.message);
    }
  };
  toggleFavouriteJob = async (
    jobId: Types.ObjectId,
    userId: Types.ObjectId,
  ) => {
    try {
      const [user, existingJob] = await Promise.all([
        this.userRepository.findById(userId),
        this.jobRepository.findById(jobId),
      ]);
      if (!user) throw new Error("User not exist");
      if (!existingJob) throw new Error("Job not exist");
      const isAlreadyFav = user.favourites.includes(jobId);
      const updateOperation = isAlreadyFav
        ? { $pull: { favourites: jobId } }
        : { $addToSet: { favourites: jobId } };
      const data = await this.userRepository.updateWithOperators(
        userId,
        updateOperation,
      );
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( toggleFavouriteJob ) => ${error}`);
      throw new Error(error.message);
    }
  };
  getMeFavouriteJobs = async (_id: Types.ObjectId) => {
    try {
      const data = this.userRepository.findByIdWithRef(_id);
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getMeFavouriteJobs ) => ${error}`);
      throw new Error(error.message);
    }
  };
}
