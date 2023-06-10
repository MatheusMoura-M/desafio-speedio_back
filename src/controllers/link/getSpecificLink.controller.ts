import { Request, Response } from "express";
import { getSpecificLinkService } from "../../services/link";

export const getSpecificLinkController = async (
  req: Request,
  res: Response
) => {
  const linkId: string = req.params.id;
  const link = await getSpecificLinkService(linkId);
  return res.status(200).json(link);
};
