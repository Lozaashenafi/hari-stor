import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export const runtime = 'nodejs';
export const maxDuration = 10; // Hobby cap is 10s, Pro can go higher

/**
 * GET /api/cron/keep-alive
 *
 * Vercel Cron Job that keeps the Neon PostgreSQL database warm.
 *
 * Neon free-tier databases sleep after ~5 minutes of inactivity. When a
 * visitor arrives on a cold DB the first request can take 2-5 seconds
 * while Neon wakes up. This route runs a trivial query every 4 minutes
 * so the DB is always warm and the storefront feels instant.
 *
 * Security:
 *   - Vercel sends `x-vercel-cron: 1` on all cron requests.
 *   - Vercel also sends `authorization: Bearer <CRON_SECRET>`.
 *   - We verify both; if CRON_SECRET is not set the route is unprotected
 *     (acceptable during development, but set it in production).
 *
 * Required env vars (Vercel):
 *   - CRON_SECRET  –  any random string, shared between Vercel config and here
 */
export async function GET(request: Request) {
  // 1. Verify the request came from Vercel Cron
  // In dev, we skip the header check so you can test with curl.
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const authHeader = request.headers.get('authorization');
  const expected = process.env.CRON_SECRET;

  if (!isVercelCron && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (expected && authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 2. Ping the database with the lightest possible query
  try {
    const start = Date.now();
    await db.execute(sql`SELECT 1`);
    const elapsed = Date.now() - start;

    console.log(`[CRON] Keep-alive ping succeeded in ${elapsed}ms`);

    return NextResponse.json({
      ok: true,
      elapsed: `${elapsed}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[CRON] Keep-alive ping failed:', error.message);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }
}
