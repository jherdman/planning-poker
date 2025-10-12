import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

if (typeof DATABASE_URL !== "string") {
	throw new Error("DATABASE_URL is not set");
}

const client = new Pool({ connectionString: DATABASE_URL });
const db = drizzle({ client });

// @private
async function testConnection() {
	return await db.execute(sql`select 1`);
}

export { db, client, testConnection };
