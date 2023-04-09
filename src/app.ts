import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import env, { CREDENTIALS, LOG_FORMAT, ORIGINS, PORT } from "@src/config";
import { logger, stream } from "@src/utils/logger";
import hpp from "hpp";
import errorMiddleware from "@src/middlewares/error.middleware";
import { router as todoRouter } from "@src/routes/todos.route";
import { ResponseWithPayload } from "./types/ModifiedResponse";

const initializeMiddlewares = (app: Express) => {
  // initialize logger
  app.use(
    morgan(LOG_FORMAT, {
      stream,
      skip: (req) => {
        return req.url === "/healthcheck";
      },
    }),
  );

  // cors
  app.use(
    cors({
      origin: new RegExp(ORIGINS),
      credentials: CREDENTIALS,
    }),
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // hpp(Prevent HTTP Parameter Pollution attacks)
  app.use(hpp());

  // compression
  app.use(compression());
};

const initializeHealthcheck = (app: Express) => {
  app.get(
    "/healthcheck",
    (
      _req,
      res: ResponseWithPayload<{
        message: string;
        date: string;
      }>,
    ) => {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        payload: {
          message: "Server is running",
          date: new Date().toUTCString(),
        },
      });
    },
  );
};

const initializeRoutes = (app: Express) => {
  app.use("/todos", todoRouter);
};

export const initializeApp = async (app: Express) => {
  // proxy (helps to get real ip address behind a reverse proxy)
  app.set("trust proxy", true);

  // initialize middlewares
  initializeMiddlewares(app);

  // initialize healthcheck
  initializeHealthcheck(app);

  // initialize routes
  initializeRoutes(app);

  // initialize error handler
  app.use(errorMiddleware);

  // listen
  const server = app.listen(PORT, () => {
    logger.info("=======================================");
    logger.info(`== 🚀 Server is running on port ${PORT} ==`);
    logger.verbose(`============= Environment =============`);
    for (const [key, value] of Object.entries(env)) {
      logger.verbose(`${key}: ${value}`);
    }
    logger.info("=======================================");
  });

  return server;
};
