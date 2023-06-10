import { Request, Response } from "express";
import { getAllUsersService } from "../../services/user";

export const getAllUsersController = async (_req: Request, res: Response) => {
  const usersData = await getAllUsersService();

  res.status(200).json(usersData);
};
