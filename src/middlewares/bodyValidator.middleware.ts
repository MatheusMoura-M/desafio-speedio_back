import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const bodyValidator =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true,
      });

      req.body = validator;

      next()
      
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

export default bodyValidator;
