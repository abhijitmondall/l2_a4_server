// Unhandled Exception
process.on("uncaughtException", (err) => {
  console.log("Unhandled Exception! App Shutting down...");
  console.error(err.name, err.message, err.stack);

  process.exit(1);
});

import app from "./app.js";
import config from "./config/index.js";
import { prisma } from "./lib/prisma.js";

const port = config.port;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected to database");

    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

    // Unhandled Rejection
    process.on("unhandledRejection", (err: any) => {
      console.log("Unhandled Rejection! App Shutting down...");
      console.error(err.name, err.message, err.stack);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error("❌ Failed to connect Prisma:", error);
    process.exit(1);
  }
}

startServer();
