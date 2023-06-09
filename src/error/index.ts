import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ error: error.message });
  }

  console.log(error);

  return res.status(500).json("internal server error");
};
