import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { handleErrorResponse } from "../utils/errors";
import { sendSuccessResponse } from "../utils/responseHelper";
import mongoose, { Types } from "mongoose";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema";

export class CategoryController {
  private service;
  constructor() {
    this.service = new CategoryService();
  }
  getAllCategories = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getAllCategories();
      sendSuccessResponse(res, 200, "Retrieved categories successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  getCategoryById = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const objectId = new mongoose.Types.ObjectId(categoryId);

      const data = await this.service.getCategoryById(objectId);
      sendSuccessResponse(res, 200, "Retrieved category successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  createCategory = async (req: Request, res: Response) => {
    try {
      const { name } = await createCategorySchema.parseAsync(req.body);
      const data = await this.service.createCategory({ name });
      sendSuccessResponse(res, 201, "Created category successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  updateCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const objectId = new mongoose.Types.ObjectId(categoryId);

      const { name } = await updateCategorySchema.parseAsync(req.body);
      const data = await this.service.updateCategory(objectId, req.body);
      sendSuccessResponse(res, 200, "Updated category successfully", data);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
  deleteCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const objectId = new mongoose.Types.ObjectId(categoryId);
      await this.service.deleteCategory(objectId);
      sendSuccessResponse(res, 204, "Deleted category successfully", null);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  };
}
