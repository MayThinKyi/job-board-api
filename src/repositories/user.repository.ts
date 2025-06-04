import { Types } from "mongoose";
import { UserModel } from "../models/user.model";
import { CreateUserDTO, UpdateUserInfoDTO } from "../types/user";

export class UserRepository {
  private db;
  constructor() {
    this.db = UserModel;
  }
  create = async (body: CreateUserDTO) => {
    return this.db.create(body);
  };
  findById = async (id: Types.ObjectId) => {
    return this.db.findById(id).select("-password");
  };
  findByIdWithRef = async (id: Types.ObjectId) => {
    return this.db.findById(id).populate("favourites").select("-password");
  };
  findByEmail = async (email: string) => {
    return this.db.findOne({ email });
  };
  update = async (id: Types.ObjectId, body: UpdateUserInfoDTO) => {
    return this.db.findByIdAndUpdate(id, { ...body }, { new: true });
  };
  updateWithOperators = async (id: Types.ObjectId, body: any) => {
    return this.db.findByIdAndUpdate(id, body, { new: true });
  };
}
