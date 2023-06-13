import { Request, Response } from "express";
import { getAllLinksService } from "../../services/link";

export const getLinksController = async (_req: Request, res: Response) => {
  const linksData = await getAllLinksService();

  res.status(200).json(linksData);
};
