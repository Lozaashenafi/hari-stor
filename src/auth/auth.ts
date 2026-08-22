import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins/admin";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  // Explicitly trust both the deployed domain and localhost so auth requests
  // from either aren't rejected as "Invalid origin". Add any other domains
  // (custom domain, preview deployments, etc.) here as needed.
  trustedOrigins: [
    "https://lozashair.vercel.app",
    "http://localhost:3000",
  ],
  plugins: [admin()],
});
