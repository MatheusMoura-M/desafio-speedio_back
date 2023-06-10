import { Request, Response } from "express";
import { iLinkUpdate } from "../../interfaces/link";
import { updateLinkService } from "../../services/link";

export const updateLinkController = async (req: Request, res: Response) => {
  const linkUpdateData: iLinkUpdate = req.body;
  const userId: string = req.id;
  const linkId: string = req.params.id;
  const linkUpdated = await updateLinkService(linkUpdateData, userId, linkId);

  return res.status(200).json(linkUpdated);
};
