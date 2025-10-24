import { beforeEach, describe, expect, it } from "bun:test";
import { createEstimation, type Estimation } from "@/db/schema/estimates";
import { createParty, type Party } from "@/db/schema/parties";
import { createUser, type User } from "@/db/schema/users";

function assertParty(party: Party | undefined): asserts party is Party {
	if (!party) {
		throw new Error("Party not created");
	}
}

function assertEstimation(
	estimation: Estimation | undefined,
): asserts estimation is Estimation {
	if (!estimation) {
		throw new Error("Estimation not created");
	}
}

function assertUser(user: User | undefined): asserts user is User {
	if (!user) {
		throw new Error("User not created");
	}
}

describe("createEstimation", () => {
	let party: Party | undefined;
	let user: User | undefined;

	beforeEach(async () => {
		party = await createParty();
		user = await createUser({ name: "user1" });
	});

	it("should create an estimation", async () => {
		assertParty(party);
		assertUser(user);

		const estimation = await createEstimation({
			estimation: 100,
			partyId: party.id,
			userId: user.id,
		});

		assertEstimation(estimation);

		expect(estimation.estimation).toBe(100);
		expect(estimation.partyId).toBe(party.id);
	});

	it("should disallow a negative estimation", () => {
		expect(async () => {
			assertParty(party);
			assertUser(user);

			await createEstimation({
				estimation: -100,
				partyId: party.id,
				userId: user.id,
			});
		}).toThrow();
	});
});
