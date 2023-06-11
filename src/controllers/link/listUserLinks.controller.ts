import { Request, Response } from "express";
import { listUserLinksService } from "../../services/link";

export const listUserLinksController = async (req: Request, res: Response) => {
  const userId: string = req.id;
  const data = await listUserLinksService(userId);

  return res.json(data);
};
