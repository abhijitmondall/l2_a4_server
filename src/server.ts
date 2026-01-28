import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected to database");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error("❌ Failed to connect Prisma:", error);
    process.exit(1);
  }
}

startServer();
