import { Types } from "mongoose";
import { CategoryRepository } from "../repositories/category.repository";
import Logger from "../utils/logger";
import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../types/category";

export class CategoryService {
  private repository;
  constructor() {
    this.repository = new CategoryRepository();
  }
  getAllCategories = async (): Promise<Category[]> => {
    try {
      const data = await this.repository.findAll();
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getAllCategories ) => ${error}`);
      throw new Error(error.message);
    }
  };
  getCategoryById = async (id: Types.ObjectId): Promise<Category | null> => {
    try {
      const data = await this.repository.findById(id);
      if (!data) {
        throw new Error("Category not exist");
      }
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getCategoryById ) => ${error}`);
      throw new Error(error.message);
    }
  };

  createCategory = async (body: CreateCategoryDTO): Promise<Category> => {
    try {
      const existingCategory = await this.repository.findByName(body.name);
      if (existingCategory) {
        throw new Error("Category already exist");
      }
      const data = await this.repository.create(body);
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( createCategory ) => ${error}`);
      throw new Error(error.message);
    }
  };
  updateCategory = async (
    id: Types.ObjectId,
    body: UpdateCategoryDTO,
  ): Promise<Category> => {
    try {
      const existingCategory = await this.repository.findById(id);
      if (!existingCategory) {
        throw new Error("Category not exist");
      }
      const categoryWithSameName = await this.repository.findByName(body.name!);
      if (categoryWithSameName && !categoryWithSameName._id.equals(id)) {
        throw new Error("Category already exist");
      }
      const data = await this.repository.update(id, body);
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( updateCategory ) => ${error}`);
      throw new Error(error.message);
    }
  };
  deleteCategory = async (id: Types.ObjectId): Promise<void> => {
    try {
      const existingCategory = await this.repository.findById(id);
      if (!existingCategory) {
        throw new Error("Category not exist");
      }
      await this.repository.delete(id);
    } catch (error: any) {
      Logger.error(`Service error at ( deleteCategory ) => ${error}`);
      throw new Error(error.message);
    }
  };
}
