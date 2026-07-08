import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
});

export const db = drizzle({ client: pool });
