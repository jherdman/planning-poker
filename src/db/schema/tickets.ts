import { sql } from "drizzle-orm";
import {
	check,
	integer,
	pgTable as table,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { db } from "..";
import { partiesTable } from "./parties";

export const ticketsTable = table(
	"tickets",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		partyId: integer("party_id")
			.notNull()
			.references(() => partiesTable.id),
		name: text().notNull(),
		description: text(),
		createdAt: timestamp("created_at").notNull().default(sql`now()`),
		updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
	},
	(table) => [check("name_not_empty", sql`${table.name} <> ''`)],
);

export type Ticket = typeof ticketsTable.$inferSelect;

export async function createTicket({
	name,
	description,
	partyId,
}: {
	name: Ticket["name"];
	partyId: Ticket["partyId"];
	description?: Ticket["description"];
}) {
	const cleanName = name.trim();
	const cleanDescription = description?.trim();

	const [record] = await db
		.insert(ticketsTable)
		.values({ name: cleanName, description: cleanDescription, partyId })
		.returning();
	return record;
}
