// app/api/admin/register/route.ts
// Temporary bootstrap route for creating admin accounts via curl.
// Protected by a shared secret (ADMIN_BOOTSTRAP_SECRET) instead of a session,
// since this is meant to be called before any admin session exists.
//
// Example:
//   curl -X POST http://localhost:3000/api/admin/register \
//     -H "content-type: application/json" \
//     -H "x-setup-secret: $ADMIN_BOOTSTRAP_SECRET" \
//     -d '{"email":"admin@example.com","password":"changeme123","name":"Admin"}'
//
// Remove this route once you're done bootstrapping admins.

import { NextResponse } from 'next/server'
import { auth } from '@/auth/auth'
import { db } from '@/db'
import { profiles } from '@/db/schema'

export async function POST(request: Request) {
  const secret = process.env.ADMIN_BOOTSTRAP_SECRET
  if (!secret) {
    console.error('ADMIN_BOOTSTRAP_SECRET is not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  if (request.headers.get('x-setup-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { email?: string; password?: string; name?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { email, password, name } = body
  if (!email || !password) {
    return NextResponse.json({ error: 'email and password are required' }, { status: 400 })
  }

  try {
    // No headers forwarded here on purpose: this route is auth'd by the
    // shared secret above, not a session. Better Auth's admin plugin treats
    // "headers were passed but no session found" as UNAUTHORIZED, so passing
    // headers through would break this endpoint's whole reason for existing.
    const result = await auth.api.createUser({
      body: {
        email,
        password,
        name: name ?? email,
        role: 'admin',
      },
    })

    if (result?.user) {
      await db.insert(profiles).values({
        id: result.user.id,
        email,
        displayName: name ?? null,
      })
    }

    return NextResponse.json({ success: true, user: result?.user })
  } catch (err: unknown) {
    console.error('Admin bootstrap error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create admin' },
      { status: 500 },
    )
  }
}
