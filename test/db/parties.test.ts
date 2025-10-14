import { describe, expect, it } from "bun:test";
import { createParty, getPartyBySlug } from "@/db/schema/parties";

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

describe("getPartyBySlug", () => {
	it("should get a party", async () => {
		const party = await createParty();

		if (!party) {
			throw new Error("Party not created");
		}

		expect(party).toBeDefined();

		const retrievedParty = await getPartyBySlug(party.slug);
		expect(retrievedParty).toBeDefined();
	});

	it("should not get a party with an invalid slug", async () => {
		const retrievedParty = await getPartyBySlug("invalid");
		expect(retrievedParty).toBeUndefined();
	});
});
