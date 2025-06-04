import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET_KEY } from "../config/jwtConfig";
import { Types } from "mongoose";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload: { _id: Types.ObjectId; role: string }) => {
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });
};

const verifyToken = (token: string) => {
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  return jwt.verify(token, JWT_SECRET_KEY);
};

export { hashPassword, comparePassword, generateToken, verifyToken };
