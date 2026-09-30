import net from "node:net";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// This machine has no working IPv6 route, and Node's happy-eyeballs
// (autoSelectFamily) misfires in that situation: the family race kills all
// connection attempts and fetch() fails with ETIMEDOUT even though every
// IPv4 address is individually reachable. Connecting sequentially
// (IPv4 first) is reliable here. Must run before any connection is opened.
net.setDefaultAutoSelectFamily(false);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// The path to this Neon endpoint is lossy (broken IPv6 + a flaky IPv4 route
// where the first packet often gets blackholed), so the FIRST request after
// an idle period frequently takes 5-10s while connections warm up, then
// settles to ~180ms. We can't fix the network, so we ride it out:
//   - longer per-attempt timeout (30s) so a slow warm-up doesn't abort
//   - more attempts (5) with a capped backoff
// Worst case is ~2.5 minutes of retries instead of an error page; typical
// cold case is one slow request that succeeds.
const MAX_ATTEMPTS = 5;
const ATTEMPT_TIMEOUT_MS = 30_000;
const MAX_BACKOFF_MS = 2_000;

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
        await sleep(Math.min(attempt * 500, MAX_BACKOFF_MS));
      }
    }
  }

  throw lastError;
}

neonConfig.fetchFunction = fetchWithRetry;

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({ client: sql, schema });
