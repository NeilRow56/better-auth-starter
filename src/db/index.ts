import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schema";
import { env } from "@/lib/env/server";

config({ path: ".env" }); // or .env.local

export const db = drizzle(env.DATABASE_URL!, { schema });
