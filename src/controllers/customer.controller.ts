import mongoose from "mongoose";
import {
  addCustomerSchema,
  updateCustomerSchema,
} from "../schema/customer.schema";
import { CustomerService } from "../services/customer.service";
import { handleErrorResponse } from "../utils/errors";
import { sendSuccessResponse } from "../utils/responseHelper";
import { Request, Response } from "express";

export class CustomerController {
  private service;
  constructor() {
    this.service = new CustomerService();
  }
  getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.service.getAllCustomers();
      sendSuccessResponse(res, 200, "Retrieved customers successfully", data);
    } catch (error: any) {
      handleErrorResponse(error, res);
    }
  };
  getCustomerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customerId } = req.params;
      const data = await this.service.getCustomerById(customerId);
      sendSuccessResponse(res, 200, "Retrieved customer successfully", data);
    } catch (error: any) {
      handleErrorResponse(error, res);
    }
  };
  createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, lastName, email, phone, address } =
        await addCustomerSchema.parseAsync(req.body);
      const data = await this.service.createCustomer({
        firstName,
        lastName,
        email,
        phone,
        address,
      });
      sendSuccessResponse(res, 201, "Created new customer successfully", data);
    } catch (error: any) {
      handleErrorResponse(error, res);
    }
  };
  updateCustomer = async (req: Request, res: Response) => {
    try {
      const { customerId } = req.params;
      const objectId = new mongoose.Types.ObjectId(customerId);
      const { firstName, lastName, email, phone, address } =
        await updateCustomerSchema.parseAsync(req.body);
      const data = await this.service.updateCustomer(customerId, {
        firstName,
        lastName,
        email,
        phone,
        address,
        _id: objectId,
      });
      sendSuccessResponse(res, 200, "Updated customer successfully", data);
    } catch (error: any) {
      handleErrorResponse(error, res);
    }
  };
  deleteCustomer = async (req: Request, res: Response) => {
    try {
      const { customerId } = req.params;
      await this.service.deleteCustomer(customerId);
      sendSuccessResponse(res, 204, "Deleted customer successfully", null);
    } catch (error: any) {
      handleErrorResponse(error, res);
    }
  };
}
