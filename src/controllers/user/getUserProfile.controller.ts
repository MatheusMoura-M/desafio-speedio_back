import { Request, Response } from "express";
import { userProfileService } from "../../services/user";

export const userProfileController = async (req: Request, res: Response) => {
  const returned = await userProfileService(req.id);

  return res.status(200).json(returned);
};
