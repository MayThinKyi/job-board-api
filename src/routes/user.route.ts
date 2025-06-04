import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();
const router = Router();

router.get("/me", userController.getMe);
router.put("/me", userController.updateUserInfo);
router.put("/me/favourites", userController.toggleFavouriteJob);
router.get("/me/favourites", userController.getMeFavouriteJobs);

export default router;
