import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ONLY check the database if the user is trying to access /admin
  // This makes the rest of your site (Home, etc.) load MUCH faster.
  if (pathname.startsWith("/admin")) {
    try {
      const session = await auth.api.getSession({ headers: request.headers });

      if (!session) {
        const loginUrl = new URL("/login", request.url);
        // Add the current path as a redirect so they come back after login
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // 2. Only administrators may access the admin area.
      if (session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If the DB connection fails in middleware, don't crash the whole site
      console.error("Middleware Auth Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // 2. Updated matcher to ignore the new api/upload route and static files
  matcher: [
    "/((?!api/upload|_next/static|_next/image|favicon.ico|uploads|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};