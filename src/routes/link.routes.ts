import { Router } from "express";
import { bodyValidator, validateTokenMiddleware } from "../middlewares";
import { linkCreateSchema, linkUpdateSchema } from "../schemas/link";
import {
  createLinkController,
  getLinksController,
  getSpecificLinkController,
  updateLinkController,
  deleteLinkController,
} from "../controllers/link";

const linkRoutes = Router();

linkRoutes.post(
  "",
  validateTokenMiddleware,
  bodyValidator(linkCreateSchema),
  createLinkController
);

linkRoutes.get("", getLinksController);
linkRoutes.get("/:id", getSpecificLinkController);

linkRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  bodyValidator(linkUpdateSchema),
  updateLinkController
);

linkRoutes.delete("/:id", validateTokenMiddleware, deleteLinkController);

export default linkRoutes;
