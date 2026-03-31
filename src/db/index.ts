// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'; // 1. Import your entire schema

const connectionString = process.env.DATABASE_URL!;

// 2. Disable prefetch for Supabase/PgBouncer if using port 6543
const client = postgres(connectionString, { prepare: false }); 

// 3. Pass the schema object here
export const db = drizzle(client, { schema });