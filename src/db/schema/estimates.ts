import { sql } from "drizzle-orm";
import {
	check,
	integer,
	pgTable as table,
	timestamp,
} from "drizzle-orm/pg-core";
import { db } from "@/db";
import { ticketsTable } from "./tickets";
import { usersTable } from "./users";

export const estimationsTable = table(
	"estimations",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		ticketId: integer("ticket_id")
			.notNull()
			.references(() => ticketsTable.id),
		userId: integer("user_id")
			.notNull()
			.references(() => usersTable.id),
		estimation: integer("estimation").notNull(),
		createdAt: timestamp("created_at").notNull().default(sql`now()`),
		updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
	},
	(table) => [check("estimation_positive", sql`${table.estimation} >= 0`)],
);

export type Estimation = typeof estimationsTable.$inferSelect;

export async function createEstimation({
	estimation,
	ticketId,
	userId,
}: {
	estimation: Estimation["estimation"];
	ticketId: Estimation["ticketId"];
	userId: Estimation["userId"];
}) {
	const [record] = await db
		.insert(estimationsTable)
		.values({ estimation, ticketId, userId })
		.returning();
	return record;
}

export async function destroyAllEstimations() {
	await db.delete(estimationsTable);
}
