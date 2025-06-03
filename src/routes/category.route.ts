import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const categoryContoller = new CategoryController();
const router = Router();

router.get("/", categoryContoller.getAllCategories);
router.get("/:categoryId", categoryContoller.getCategoryById);
router.post("/", categoryContoller.createCategory);
router.put("/:categoryId", categoryContoller.updateCategory);
router.delete("/:categoryId", categoryContoller.deleteCategory);

export default router;
