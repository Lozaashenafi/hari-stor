import { auth } from "@/auth/auth";
import { headers } from "next/headers";

/** Ensures the caller is signed in with the admin role. Returns the session. */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}