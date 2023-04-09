import { bool, cleanEnv, port, str } from "envalid";
import { existsSync } from "fs";

const envPathOrder =
  process.env.NODE_ENV !== "production"
    ? [".env.development", ".env", ".env.example"]
    : [".env", ".env.production", ".env.example"];

const firstExistingEnvFile = envPathOrder.find((path) => existsSync(path));

if (firstExistingEnvFile) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: firstExistingEnvFile });
}

const env = cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str({
    desc: "Node environment",
    choices: ["development", "production"],
  }),
  LOG_DIR: str({
    desc: "Directory to store logs",
  }),
  LOG_FORMAT: str({
    desc: "Log format",
  }),
  ORIGINS: str({
    desc: "Comma separated list of allowed origins",
  }),
  CREDENTIALS: bool({
    desc: "Allow credentials",
  }),
});

export const {
  PORT,
  NODE_ENV,
  LOG_DIR,
  LOG_FORMAT,
  ORIGINS,
  CREDENTIALS,
  isDev,
  isProd,
} = env;

export default env;
