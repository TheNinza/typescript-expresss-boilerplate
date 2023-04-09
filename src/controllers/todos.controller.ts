import { HttpException } from "@src/exceptions/httpException";
import { ResponseWithPayload } from "@src/types/ModifiedResponse";
import { NextFunction, Request } from "express";

export const getAllTodos = async (
  _req: Request,
  res: ResponseWithPayload<{
    todos: {
      id: number;
      title: string;
      description: string;
    }[];
  }>,
  next: NextFunction,
) => {
  try {
    if (Math.random() > 0.7) {
      throw new HttpException(401, "You are not authorized");
    }

    const todos = [
      {
        id: 1,
        title: "Todo 1",
        description: "Todo 1 description",
      },
      {
        id: 2,
        title: "Todo 2",
        description: "Todo 2 description",
      },
    ];

    res.status(200).json({
      status: "success",
      statusCode: 200,
      payload: {
        todos,
      },
    });
  } catch (error) {
    next(error);
  }
};
