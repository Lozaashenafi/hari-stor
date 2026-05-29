import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import * as schema from './schema';

if (typeof window === 'undefined' && !globalThis.WebSocket) {
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL!;

// Singleton to prevent connection exhaustion
const globalForPg = global as unknown as { pool: Pool | undefined };

export const pool = globalForPg.pool ?? new Pool({ 
  connectionString,
  // Add these for better stability in Middleware
  connectionTimeoutMillis: 10000,
});

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pool = pool;
}

export const db = drizzle(pool, { schema });