import mongoose from "mongoose";
import { startDB } from "../database/db";
import { customerSeeder } from "./helpers/customerSeeder";

const main = async () => {
  try {
    startDB();
    await customerSeeder();
    mongoose.connection.close();
    console.log("All seeders completed!");
  } catch (err) {
    console.error("Seeding failed:", err);
    mongoose.connection.close();
    process.exit(1);
  }
};

main();
