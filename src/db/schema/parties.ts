import { sql } from "drizzle-orm";
import {
	integer,
	pgTable as table,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { db } from "@/db";
import friendlyId from "@/utils/friendlyId";
// import { createSelectSchema } from "drizzle-zod";

/**
 * The parties table.
 */
export const partiesTable = table("parties", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	slug: text("slug")
		.notNull()
		.unique()
		.$defaultFn(() => friendlyId()),
	createdAt: timestamp("created_at").notNull().default(sql`now()`),
	updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export type Party = typeof partiesTable.$inferSelect;

// export const partySelectSchema = createSelectSchema(partiesTable);

/**
 * Creates a party.
 * @returns The created party.
 */
export async function createParty(): Promise<Party | undefined> {
	const [party] = await db.insert(partiesTable).values({}).returning();
	return party;
}

/**
 * Destroys all parties, ya party pooper.
 */
export async function destroyAllParties() {
	console.log("destroying all parties");
	return await db.delete(partiesTable);
}
