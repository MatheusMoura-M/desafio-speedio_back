import { Request, Response } from "express";
import { getLinksService } from "../../services/link";

export const getLinksController = async (_req: Request, res: Response) => {
  const linksData = await getLinksService();

  res.status(200).json(linksData);
};
