import dotenv from "dotenv";
import mongoose from "mongoose";
import Logger from "../utils/logger";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

export const startDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(MONGO_URI);
    Logger.info("Connected to MongoDB");
  } catch (error) {
    Logger.error(error);
  }
};
