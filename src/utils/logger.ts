import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { LOG_DIR, isProd } from "@src/config";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

// logs dir
const logDir = join(__dirname, LOG_DIR);
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} :: ${level} :: ${message}`;
});

// colors
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  verbose: "cyan",
  debug: "white",
};
winston.addColors(colors);

// logger
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/debug",
      filename: "%DATE%.debug.log",
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),

    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: "%DATE%.error.log",
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),

    new winston.transports.Console({
      level: isProd ? "http" : "debug",
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize({
          all: true,
        }),
        logFormat,
      ),
    }),
  ],
});

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write: (message: string) => {
    logger.http(message.substring(0, message.lastIndexOf("\n")));
  },
};
