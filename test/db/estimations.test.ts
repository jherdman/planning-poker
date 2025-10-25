import { beforeEach, describe, expect, it } from "bun:test";
import assertNotUndefined from "test/support/assertions";
import { createEstimation } from "@/db/schema/estimates";
import { createParty } from "@/db/schema/parties";
import { createTicket, type Ticket } from "@/db/schema/tickets";
import { createUser, type User } from "@/db/schema/users";

describe("createEstimation", () => {
	let ticket: Ticket | undefined;
	let user: User | undefined;

	beforeEach(async () => {
		const party = await createParty();
		assertNotUndefined(party);

		ticket = await createTicket({
			name: "Ticket 1",
			description: null,
			partyId: party.id,
		});
		user = await createUser({ name: "user1" });
	});

	it("should create an estimation", async () => {
		assertNotUndefined(user);
		assertNotUndefined(ticket);

		const estimation = await createEstimation({
			estimation: 100,
			ticketId: ticket.id,
			userId: user.id,
		});

		assertNotUndefined(estimation);

		expect(estimation.estimation).toBe(100);
		expect(estimation.ticketId).toBe(ticket.id);
		expect(estimation.userId).toBe(user.id);
	});

	it("should disallow a negative estimation", () => {
		expect(async () => {
			assertNotUndefined(user);
			assertNotUndefined(ticket);

			await createEstimation({
				estimation: -100,
				ticketId: ticket.id,
				userId: user.id,
			});
		}).toThrow();
	});
});
