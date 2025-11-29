import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

// Enhance connection string for required SSL if not already specified.
function withSslMode(url) {
  if (!url) return url;
  if (/sslmode=/i.test(url)) return url;
  return url.includes("?") ? `${url}&sslmode=require` : `${url}?sslmode=require`;
}

// Prefer pooled connection string (port 6543) if provided separately.
const rawUrl = process.env.DATABASE_POOL_URL || process.env.DATABASE_URL;
const connectionString = withSslMode(rawUrl);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  // Keep pool tiny for serverless to avoid exhausting Supabase connections.
  max: parseInt(process.env.PG_POOL_MAX || "1", 10),
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
});

const adapter = new PrismaPg(pool);

// Reuse singleton across hot reloads and serverless invocations.
const globalKey = "__PRISMA_CLIENT__";
if (!global[globalKey]) {
  global[globalKey] = new PrismaClient({ adapter });
}
const prisma = global[globalKey];

export default prisma;
