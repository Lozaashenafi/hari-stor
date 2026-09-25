import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// This network intermittently drops connections to Neon's endpoints
// (broken IPv6 + flaky/blackholed IPv4 routes), so retry connection-level
// failures with a short backoff before giving up.
const MAX_ATTEMPTS = 4;
const ATTEMPT_TIMEOUT_MS = 15_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const timeout = AbortSignal.timeout(ATTEMPT_TIMEOUT_MS);
      const signal = init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
      return await fetch(input, { ...init, signal });
    } catch (error) {
      lastError = error;
      // Caller cancelled — do not retry
      if (init?.signal?.aborted) throw error;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(attempt * 300);
      }
    }
  }

  throw lastError;
}

neonConfig.fetchFunction = fetchWithRetry;

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({ client: sql, schema });
