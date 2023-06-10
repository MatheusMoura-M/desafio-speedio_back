import { Router } from "express";
import { bodyValidator, validateTokenMiddleware } from "../middlewares";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/user";
import { userCreateRequestSchema } from "../schemas/user";

const userRoutes = Router();

userRoutes.post(
  "",
  bodyValidator(userCreateRequestSchema),
  createUserController
);

userRoutes.delete("", validateTokenMiddleware, deleteUserController);

userRoutes.get("", getAllUsersController);
userRoutes.get("/:id", getUserByIdController);

export default userRoutes;
