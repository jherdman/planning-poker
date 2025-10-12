import { afterAll, afterEach, beforeEach, mock } from "bun:test";
import { PGlite } from "@electric-sql/pglite";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { client, db } from "@/db";
import { applyMigrations } from "@/db/migrate";

mock.module("@/db", () => {
	const client = new PGlite();
	const db = drizzle({ client });

	return {
		db,
		client,
	};
});

beforeEach(async () => {
	await applyMigrations();
});

afterEach(async () => {
	await db.execute(sql`drop schema if exists public cascade`);
	await db.execute(sql`create schema public`);
	await db.execute(sql`drop schema if exists drizzle cascade`);
});

afterAll(async () => {
	await (client as unknown as PGlite).close();
});
