import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (typeof DATABASE_URL !== "string") {
	throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema",
	out: "./drizzle",
	dbCredentials: {
		url: DATABASE_URL,
	},
});
