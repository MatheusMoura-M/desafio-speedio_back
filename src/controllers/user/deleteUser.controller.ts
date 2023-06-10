import { Request, Response } from "express";
import { deleteUserService } from "../../services/user";

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.id);

  return res.status(204).json();
};
