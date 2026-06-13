import app from "./app";
import { logger } from "./lib/logger";
import { seedDatabaseIfNeeded } from "./lib/storage.js";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function startServer() {
  try {
    logger.info("Initializing database and verifying connection...");
    await seedDatabaseIfNeeded();
    logger.info("Database connection validated successfully.");

    app.listen(port, () => {
      logger.info({ port }, "Server listening");
    });
  } catch (err) {
    logger.error({ err }, "Failed to start API server");
    process.exit(1);
  }
}

startServer();

