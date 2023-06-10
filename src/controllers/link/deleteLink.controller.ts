import { Request, Response } from "express";
import { deleteLinkService } from "../../services/link";

export const deleteLinkController = async (req: Request, res: Response) => {
  const userId: string = req.id;
  const linkId: string = req.params.id;
  const linkDeleted = await deleteLinkService(userId, linkId);
  return res.status(204).json(linkDeleted);
};
