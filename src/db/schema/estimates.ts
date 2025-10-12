import { sql } from "drizzle-orm";
import {
	check,
	integer,
	pgTable as table,
	timestamp,
} from "drizzle-orm/pg-core";
import { db } from "@/db";
import { partiesTable } from "./parties";

export const estimationsTable = table(
	"estimations",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		partyId: integer("party_id")
			.notNull()
			.references(() => partiesTable.id),
		estimation: integer("estimation").notNull(),
		createdAt: timestamp("created_at").notNull().default(sql`now()`),
		updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
	},
	(table) => [check("estimation_positive", sql`${table.estimation} >= 0`)],
);

export type Estimation = typeof estimationsTable.$inferSelect;

export async function createEstimation({
	estimation,
	partyId,
}: {
	estimation: Estimation["estimation"];
	partyId: Estimation["partyId"];
}) {
	const [record] = await db
		.insert(estimationsTable)
		.values({ estimation, partyId })
		.returning();
	return record;
}

export async function destroyAllEstimations() {
	await db.delete(estimationsTable);
}
