import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../types/user";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/jwtUtils";
import Logger from "../utils/logger";

export class AuthService {
  private repository;
  constructor() {
    this.repository = new UserRepository();
  }

  register = async (body: CreateUserDTO) => {
    try {
      const existingUser = await this.repository.findByEmail(body.email);
      if (existingUser) {
        throw new Error("Email already exist");
      }
      const hashedPassword = await hashPassword(body.password);
      await this.repository.create({
        email: body.email,
        password: hashedPassword,
      });
      return await this.login({ email: body.email, password: body.password });
    } catch (error: any) {
      Logger.error(`Service error at ( register ) => ${error}`);
      throw new Error(error.message);
    }
  };
  login = async (body: CreateUserDTO) => {
    try {
      const existingUser = await this.repository.findByEmail(body.email);
      if (!existingUser) {
        throw new Error("Email not exist");
      }
      const isPasswordValid = await comparePassword(
        body.password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        throw new Error("Password is invalid");
      }
      const token = generateToken({
        _id: existingUser._id,
        role: existingUser.role,
      });
      return { user: { email: existingUser.email }, token };
    } catch (error: any) {
      Logger.error(`Service error at ( login ) => ${error}`);
      throw new Error(error.message);
    }
  };
}
