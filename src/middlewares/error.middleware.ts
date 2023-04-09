import { NextFunction, Request } from "express";
import { HttpException } from "@src/exceptions/httpException";
import { logger } from "@src/utils/logger";
import { ResponseWithPayload } from "@src/types/ModifiedResponse";

const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: ResponseWithPayload<{
    message: string;
  }>,
  next: NextFunction,
) => {
  try {
    const status: number = err.status || 500;
    const message: string = err.message || "Something went wrong";

    // send response
    res.status(status).send({
      status: "error",
      statusCode: status,
      payload: {
        message,
      },
    });

    // log error
    logger.error(
      `${req.method} ${req.path} :: StatusCode => ${status} :: Message => ${message}`,
    );

    // print stack trace
    if (status === 500) {
      for (const line of err.stack?.split("\n") || []) {
        logger.error(line);
      }
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
