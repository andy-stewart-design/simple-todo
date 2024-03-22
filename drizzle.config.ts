import { Config } from "drizzle-kit";
import "@/db/config";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN,
  },
} satisfies Config;
