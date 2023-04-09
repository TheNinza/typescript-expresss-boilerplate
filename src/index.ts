import express from "express";
import { initializeApp } from "@src/app";
import { logger } from "./utils/logger";

const main = async () => {
  // start an express instance
  const app = express();
  const server = await initializeApp(app);

  // Graceful shutdown
  process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      logger.info("HTTP server closed");
    });
  });

  process.on("SIGINT", () => {
    logger.info("SIGINT signal received: closing HTTP server");
    server.close(() => {
      logger.info("HTTP server closed");
    });
  });
};

main();
