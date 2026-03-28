import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // THIS LINE IS THE FIX
  schemaFilter: ["public"], 
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  
});