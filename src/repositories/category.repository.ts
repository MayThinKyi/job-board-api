import { Types } from "mongoose";
import { CategoryModel } from "../models/category.model";
import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../types/category";

export class CategoryRepository {
  private db;
  constructor() {
    this.db = CategoryModel;
  }
  findAll = async (): Promise<Category[]> => {
    return this.db.find();
  };
  findById = async (id: Types.ObjectId): Promise<Category | null> => {
    return this.db.findById(id);
  };
  findByName = async (name: string): Promise<Category | null> => {
    return this.db.findOne({ name });
  };
  create = async (body: CreateCategoryDTO): Promise<Category> => {
    return this.db.create(body);
  };
  update = async (
    id: Types.ObjectId,
    body: UpdateCategoryDTO,
  ): Promise<Category> => {
    return this.db.findByIdAndUpdate(id, body, {
      new: true,
    }) as unknown as Category;
  };
  delete = async (id: Types.ObjectId): Promise<null> => {
    return this.db.findByIdAndDelete(id);
  };
}
