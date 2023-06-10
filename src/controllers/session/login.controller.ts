import { Request, Response } from "express";
import { userLoginService } from "../../services/session/userLogin.service";

export const userLoginController = async (req: Request, res: Response) => {
  const token = await userLoginService(req.body);

  return res.status(200).json(token);
};
