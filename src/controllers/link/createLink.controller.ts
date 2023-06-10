import { Request, Response } from "express";
import { createLinkService } from "../../services/link";

export const createLinkController = async (req: Request, res: Response) => {
  const newLink = await createLinkService(req.body, req.id);

  return res.status(201).json(newLink);
};
