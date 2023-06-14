import { Request, Response } from "express";
import { getSpecificLinkService } from "../../services/link";

export const getSpecificLinkController = async (
  req: Request,
  res: Response
) => {
  const shortened_link: string = req.params.shortened_link;
  const link = await getSpecificLinkService(shortened_link);
  return res.status(200).json(link);
};
