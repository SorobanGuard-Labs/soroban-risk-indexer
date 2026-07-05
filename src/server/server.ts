import { env } from "../config/env";
import { logger } from "../utils/logger";
import { createApp } from "./app";

export const startServer = () => {
  const app = createApp();

  return app.listen(env.port, () => {
    logger.info(`Soroban Risk Indexer listening on port ${env.port}`, {
      mockMode: env.mockMode
    });
  });
};
