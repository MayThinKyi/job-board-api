import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const CategoryModel = mongoose.model("Category", categorySchema);

export { categorySchema, CategoryModel };
