import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
  },
  { timestamps: true },
);

export const CustomerDB = mongoose.model("Customer", customerSchema);
