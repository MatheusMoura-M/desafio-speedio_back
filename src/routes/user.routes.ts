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
import { listUserLinksController } from "../controllers/link";

const userRoutes = Router();

userRoutes.post(
  "",
  bodyValidator(userCreateRequestSchema),
  createUserController
);

userRoutes.get("/profile", validateTokenMiddleware, userProfileController);
userRoutes.get("/links", validateTokenMiddleware, listUserLinksController);

userRoutes.delete("", validateTokenMiddleware, deleteUserController);

userRoutes.get("", getAllUsersController);
userRoutes.get("/:id", getUserByIdController);

export default userRoutes;
