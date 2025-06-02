import { Types } from "mongoose";

export interface Customer {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateCustomerDTO {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CreateCustomerDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}
