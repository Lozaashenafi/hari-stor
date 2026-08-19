import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// HTTP-based connection (compatible with better-auth's drizzle adapter)
const sql = neon(connectionString);

export const db = drizzle(sql, {
  schema,
});
