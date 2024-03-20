import winston from "winston";
import { environment } from "../env.js";

const NODE_ENV = environment.api.env || "DEV";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warn: "yellow",
    info: "blue",
    http: "green",
    debug: "cyan",
  },
};

export const DevelopmentLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

export const ProductionLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "http",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "info",
      format: winston.format.combine(winston.format.simple()),
    }),
  ],
});

export const loggerMiddleware = (req, res, next) => {
  const logger =
    NODE_ENV === "PROD" ? ProductionLogger : DevelopmentLogger;
  req.logger = logger;
  next();
};

export const getLogger = () => {
  const logger =
    NODE_ENV === "PROD" ? ProductionLogger : DevelopmentLogger;
  return logger;
};
