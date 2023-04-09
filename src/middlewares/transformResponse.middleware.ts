import { logger } from "@src/utils/logger";
import { NextFunction, Request, Response } from "express";

export const transformResponseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug(JSON.stringify(res, null, 2));
  next();
};
