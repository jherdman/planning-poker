import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from 'bun';

const DATABASE_URL = process.env.DATABASE_URL;

if (typeof DATABASE_URL !== "string") {
  throw new Error("DATABASE_URL is not set");
}

const client = new SQL(DATABASE_URL);
const db = drizzle({ client });

export default db;

// @private
export async function testConnection() {
  try {
    return await client`
      SELECT 1
    `;
  } catch (error) {
    throw new Error("Failed to connect to the database");
  }
}
