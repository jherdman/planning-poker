import { check, pgTable as table, timestamp, integer } from "drizzle-orm/pg-core";
import { partiesTable } from "./parties";
import { sql } from "drizzle-orm";

export const estimationsTable = table("estimations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  partyId: integer("party_id").notNull().references(() => partiesTable.id),
  estimation: integer("estimation").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
}, (table) => [
  check("estimation_positive", sql`${table.estimation} >= 0`),
]);

export type Estimation = typeof estimationsTable.$inferSelect;
