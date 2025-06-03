import mongoose from "mongoose";

export interface Category {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface CreateCategoryDTO {
  name: string;
}
export interface UpdateCategoryDTO {
  _id: mongoose.Types.ObjectId;

  name?: string;
}
