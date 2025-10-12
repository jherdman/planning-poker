import { describe, expect, it } from "bun:test";
import { createParty } from "@/db/schema/parties";

describe("createParty", () => {
	it("should insert a party", async () => {
		const party = await createParty();
		expect(party).toBeDefined();
	});

	it("should insert a party with a slug", async () => {
		const party = await createParty();

		if (!party) {
			throw new Error("Party not created");
		}

		expect(party.slug).toBeDefined();
	});
});
