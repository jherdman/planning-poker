import { migrate } from "drizzle-orm/pglite/migrator";
import { db } from "@/db";

/**
 * You should only be using this in tests.
 */
async function applyMigrations() {
	await migrate(db, { migrationsFolder: "drizzle" });
}

export { applyMigrations };
