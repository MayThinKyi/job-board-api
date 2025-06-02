import { CustomerDB } from "../models/Customer";
import {
  CreateCustomerDTO,
  Customer,
  UpdateCustomerDTO,
} from "../types/customer";

export class CustomerRepository {
  private db;
  constructor() {
    this.db = CustomerDB;
  }
  findAll = async (): Promise<Customer[] | []> => {
    return await this.db.find();
  };
  findById = async (id: string): Promise<Customer | null> => {
    return await this.db.findById(id);
  };
  create = async (body: CreateCustomerDTO): Promise<Customer> => {
    return (await this.db.create(body)) as Customer;
  };
  update = async (id: string, body: UpdateCustomerDTO): Promise<Customer> => {
    return (await this.db.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    )) as Customer;
  };
  delete = async (id: string): Promise<null> => {
    return await this.db.findByIdAndDelete(id);
  };
}
