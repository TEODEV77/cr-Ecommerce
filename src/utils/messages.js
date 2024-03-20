import { getLogger } from "./logger.js";

export const ServerRunning = (port) => {
  const logger = getLogger();
  logger.info(`Server running on ${port}`);
};
