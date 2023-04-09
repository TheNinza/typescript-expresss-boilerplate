import { Response } from "express";

type ModifiedResBody<ResponsePayload> = {
  status: "success" | "error";
  statusCode: number;
  payload: ResponsePayload;
};

export type ResponseWithPayload<ResponsePayload> = Response<
  ModifiedResBody<ResponsePayload>
>;
