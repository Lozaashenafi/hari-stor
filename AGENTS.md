<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture

## Tech Stack
- **Framework**: Next.js 16.2 (App Router)
- **Database**: Neon PostgreSQL via Drizzle ORM + postgres.js
- **Auth**: Better Auth (better-auth) with email/password
- **Storage**: Local filesystem (`public/uploads/`) via `/api/upload`

## Auth
- Config: `src/auth/auth.ts` — Better Auth server config with Drizzle adapter + admin plugin
- Client: `src/auth/client.ts` — `createAuthClient()` for client-side auth
- Middleware: `src/middleware.ts` — session check, protects `/admin/*`
- Server actions: `app/auth/actions.ts` — login, register, logout, admin management

## Key Differences from Supabase
- No Supabase Auth, Storage, or RLS
- Auth managed entirely by Better Auth tables (`user`, `session`, `account`, `verification`)
- File uploads stored locally via `/api/upload` route
- Admin operations use Better Auth's admin plugin
