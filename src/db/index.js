import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../lib/env";

const pool = new Pool({
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
});

export const db = drizzle({ client: pool });
