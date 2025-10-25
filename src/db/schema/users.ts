import { randomUUIDv7 } from "bun";
import { desc, eq, sql } from "drizzle-orm";
import {
	integer,
	pgTable as table,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { db } from "..";

/**
 * Users are meant to be ephemeral in a manner. Users can share names, but are
 * uniquely identified by their tokens. This means that if you log in twice you
 * don't have the same record.
 */
export const usersTable = table("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull(),
	token: text()
		.notNull()
		.unique()
		.$defaultFn(() => randomUUIDv7("base64url")),
	createdAt: timestamp("created_at").notNull().default(sql`now()`),
	updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
	lastSeenAt: timestamp("last_seen_at").notNull().default(sql`now()`),
});

export type User = typeof usersTable.$inferSelect;

/**
 * Creates a user.
 * @param name - The name of the user.
 * @returns The created user.
 */
export async function createUser({ name }: { name: User["name"] }) {
	const [record] = await db.insert(usersTable).values({ name }).returning();

	return record;
}

/**
 * Finds a user by their token.
 * @param token - The token of the user.
 * @returns The user, if found.
 */
export async function findUserByToken(token: User["token"]) {
	const [record] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.token, token))
		.limit(1);

	return record;
}

/**
 * Touches the last seen at timestamp for a user.
 */
export async function touchLastSeenAt(user: User) {
	user.lastSeenAt = new Date();

	await db
		.update(usersTable)
		.set({ lastSeenAt: user.lastSeenAt })
		.where(eq(usersTable.id, user.id));
}

/**
 * Lists all users, ordered by descending creation date.
 */
export async function listUsers() {
	return db.select().from(usersTable).orderBy(desc(usersTable.createdAt));
}
