import db from "@/db";
import { pgTable as table, text, timestamp, integer } from "drizzle-orm/pg-core";
import friendlyId from "@/utils/friendlyId";
import { sql } from "drizzle-orm";
// import { createSelectSchema } from "drizzle-zod";

/**
 * The parties table.
 */
export const partiesTable = table("parties", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique().$defaultFn(() => friendlyId()),
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
  return party
}

/**
 * Destroys all parties, ya party pooper.
 */
export async function destroyAllParties() {
  return await db.delete(partiesTable);
}
