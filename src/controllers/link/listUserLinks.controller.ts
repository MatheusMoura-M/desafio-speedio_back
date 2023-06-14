import { Request, Response } from "express";
import { getUserLinksService } from "../../services/link";

export const listUserLinksController = async (req: Request, res: Response) => {
  const userId: string = req.id;
  const data = await getUserLinksService(userId);

  return res.json(data);
};
