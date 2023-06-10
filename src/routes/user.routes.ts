import { Router } from "express";
import { bodyValidator, validateTokenMiddleware } from "../middlewares";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  userProfileController,
} from "../controllers/user";
import { userCreateRequestSchema } from "../schemas/user";

const userRoutes = Router();

userRoutes.post(
  "",
  bodyValidator(userCreateRequestSchema),
  createUserController
);

userRoutes.get("/profile", validateTokenMiddleware, userProfileController);

userRoutes.delete("", validateTokenMiddleware, deleteUserController);

userRoutes.get("", getAllUsersController);
userRoutes.get("/:id", getUserByIdController);

export default userRoutes;
