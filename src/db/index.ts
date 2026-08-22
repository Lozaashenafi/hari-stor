import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export const db = drizzle(pool, {
  schema,
});
