import { CustomerRepository } from "../repositories/customer.repository";
import {
  CreateCustomerDTO,
  Customer,
  UpdateCustomerDTO,
} from "../types/customer";
import Logger from "../utils/logger";

export class CustomerService {
  private repository;
  constructor() {
    this.repository = new CustomerRepository();
  }
  getAllCustomers = async (): Promise<Customer[] | []> => {
    try {
      const data = await this.repository.findAll();
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getAllCustomers ) => ${error}`);
      throw new Error(error.message);
    }
  };
  getCustomerById = async (id: string): Promise<Customer> => {
    try {
      const data = await this.repository.findById(id);
      if (!data) {
        throw new Error("Customer with the provided ID was not found");
      }
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( getCustomerById ) => ${error}`);
      throw new Error(error.message);
    }
  };
  createCustomer = async (body: CreateCustomerDTO): Promise<Customer> => {
    try {
      const data = (await this.repository.create(body)) as Customer;
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( createCustomer ) => ${error}`);
      throw new Error(error.message);
    }
  };
  updateCustomer = async (
    id: string,
    body: UpdateCustomerDTO,
  ): Promise<Customer> => {
    try {
      const existingCustomer = await this.repository.findById(id);
      if (!existingCustomer) {
        throw new Error("Customer not found");
      }
      const data = (await this.repository.update(id, body)) as Customer;
      return data;
    } catch (error: any) {
      Logger.error(`Service error at ( updateCustomer ) => ${error}`);
      throw new Error(error.message);
    }
  };
  deleteCustomer = async (id: string): Promise<void> => {
    try {
      const existingCustomer = await this.repository.findById(id);
      if (!existingCustomer) {
        throw new Error("Customer not found");
      }
      await this.repository.delete(id);
    } catch (error: any) {
      Logger.error(`Service error at ( deleteCustomer ) => ${error}`);
      throw new Error(error.message);
    }
  };
}
