import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import {
	createEstimation,
	destroyAllEstimations,
	type Estimation,
} from "@/db/schema/estimates";
import {
	createParty,
	destroyAllParties,
	type Party,
} from "@/db/schema/parties";

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

describe("createEstimation", () => {
	let party: Party | undefined;

	beforeEach(async () => {
		party = await createParty();
	});

	afterEach(async () => {
		await destroyAllEstimations();
		await destroyAllParties();
	});

	it("should create an estimation", async () => {
		assertParty(party);

		const estimation = await createEstimation({
			estimation: 100,
			partyId: party.id,
		});

		assertEstimation(estimation);

		expect(estimation.estimation).toBe(100);
		expect(estimation.partyId).toBe(party.id);
	});

	it("should disallow a negative estimation", () => {
		expect(async () => {
			assertParty(party);

			await createEstimation({ estimation: -100, partyId: party.id });
		}).toThrow();
	});
});
