/* Read-only connectivity check. Prints a classification, never secrets. */
const { PrismaClient } = require("@prisma/client");

// Extend timeouts so a suspended Neon compute has time to cold-start.
const base = process.env.DATABASE_URL || "";
const sep = base.includes("?") ? "&" : "?";
const url = base + sep + "connect_timeout=30&pool_timeout=30";
const p = new PrismaClient({ datasources: { db: { url } } });

p.lGA
  .count()
  .then((c) => console.log("DB OK - LGA count:", c))
  .catch((e) => {
    const m = String(e.message);
    if (m.includes("Can't reach")) {
      console.log("REASON: server unreachable (Neon compute suspended, or network/VPN blocking Postgres)");
    } else if (m.includes("authentication") || m.includes("password")) {
      console.log("REASON: wrong credentials in DATABASE_URL");
    } else if (m.includes("Timed out")) {
      console.log("REASON: connection pool / connect timeout");
    } else if (m.includes("does not exist")) {
      console.log("REASON: database or table missing (schema not pushed)");
    } else if (m.includes("SSL") || m.includes("TLS")) {
      console.log("REASON: SSL/TLS negotiation problem");
    } else {
      console.log("REASON: unclassified. First line:", m.split("\n").find(Boolean));
    }
  })
  .finally(() => process.exit(0));
