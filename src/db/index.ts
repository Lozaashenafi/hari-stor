import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This allows Neon to work better in local development
// and handles the connection "reset" issues.
if (process.env.NODE_ENV === 'development') {
  neonConfig.fetchConnectionCache = true;
}

const sql = neon(process.env.DATABASE_URL!);

// Use neon-http for better stability with cold starts
export const db = drizzle(sql, { schema });