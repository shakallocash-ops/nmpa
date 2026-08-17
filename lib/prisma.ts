import { PrismaClient } from "@prisma/client";

const POOL_KEY = "neon-pool-8-fast-timeout";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPoolKey?: string;
};

function datasourceUrl() {
  let url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set.");
  }

  // One Next.js process (dev + admin) needs several slots. Public pages
  // no longer stampede, so 8 is enough without starving /admin.
  if (url.includes("connection_limit=")) {
    url = url.replace(/connection_limit=\d+/, "connection_limit=8");
  } else {
    url += `${url.includes("?") ? "&" : "?"}connection_limit=8`;
  }

  if (url.includes("pool_timeout=")) {
    url = url.replace(/pool_timeout=\d+/, "pool_timeout=8");
  } else {
    url += "&pool_timeout=8";
  }

  if (url.includes("connect_timeout=")) {
    url = url.replace(/connect_timeout=\d+/, "connect_timeout=8");
  } else {
    url += "&connect_timeout=8";
  }

  return url;
}

if (globalForPrisma.prisma && globalForPrisma.prismaPoolKey !== POOL_KEY) {
  void globalForPrisma.prisma.$disconnect();
  globalForPrisma.prisma = undefined;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: datasourceUrl() } },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPoolKey = POOL_KEY;
}

export function isTransientDbError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("Timed out fetching a new connection") ||
    message.includes("Server has closed the connection") ||
    message.includes("Can't reach database server") ||
    message.includes("Connection terminated") ||
    message.includes("P1017") ||
    message.includes("P1001") ||
    message.includes("P2024")
  );
}

export async function withDbRetry<T>(operation: () => Promise<T>, attempts = 3) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isTransientDbError(error) || attempt === attempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
    }
  }
  throw lastError;
}
