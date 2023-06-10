import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../error";

export const validateTokenMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    if (req.body.original_link) {
      return next();
    }
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.email = decoded.email;
    req.id = decoded.id;

    return next();
  });
};
