import { Router } from "express";
import { userLoginController } from "../controllers/session/login.controller";

const sessionRoutes = Router();

sessionRoutes.post("", userLoginController);

export default sessionRoutes;
