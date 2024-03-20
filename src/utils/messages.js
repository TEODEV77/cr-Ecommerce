import { getLogger } from "./logger.js";

export const ServerRunning = (port) => {
  const logger = getLogger();
  logger.info(`Server running on ${port}`);
};

export const DatabaseConnected = () => {
  const logger = getLogger();
  logger.info("Database connected");
};

export const DatabaseError = (error) => {
  const logger = getLogger();
  logger.error(`Database error: ${error}`);
}