import { Types } from "mongoose";

export interface IJob {
  _id: Types.ObjectId;
  title: string;
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
  experience: "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "EXECUTIVE";
  category: string;
  status: "OPEN" | "CLOSED";
  location: string;
  info: string;
  description: string[];
  qualifications: string[];
  benefits: string[];
  isNegotiable: boolean;
  salaryFrom?: number;
  salaryTo?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateJobDTO {
  title: string;
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
  experience: "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "EXECUTIVE";
  category: string;
  status?: "OPEN" | "CLOSED";
  location: string;
  info: string;
  description: string[];
  qualifications: string[];
  benefits: string[];
  isNegotiable: boolean;
  salaryFrom?: number;
  salaryTo?: number;
}

export interface UpdateJobDTO {
  _id: Types.ObjectId;
  title?: string;
  jobType?: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
  experience?: "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "EXECUTIVE";
  category?: string;
  status?: "OPEN" | "CLOSED";
  location?: string;
  info?: string;
  description?: string[];
  qualifications?: string[];
  benefits?: string[];
  isNegotiable?: boolean;
  salaryFrom?: number;
  salaryTo?: number;
}
