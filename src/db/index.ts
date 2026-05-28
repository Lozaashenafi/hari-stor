import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from './schema';

// This tells the Neon driver to use the 'ws' package for WebSockets in Node.js
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;

// Singleton pattern to prevent exhausting connections during dev hot-reloads
const globalForPg = global as unknown as { pool: Pool | undefined };

const pool = globalForPg.pool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pool = pool;
}

export const db = drizzle(pool, { schema });