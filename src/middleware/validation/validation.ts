import { NextFunction, Request, Response } from "express";

class Validation {
  /**
   * @description Validate Body of Incoming Request
   * @param schema
   * @returns Express middleware function
   */
  body = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
      } else {
        next();
      }
    };
  };

  /**
   * @description Validate Params of Incoming Request
   * @param schema
   * @returns Express middleware function
   */
  params = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.params);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
      } else {
        next();
      }
    };
  };

  /**
   * @description Validate Query Params of Incoming Request
   * @param schema
   * @returns Express middleware function
   */
  queryParam = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.query);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
      } else {
        next();
      }
    };
  };
}

export const validate = new Validation();
