import { describe, expect, it } from "bun:test";
import assertNotUndefined from "test/support/assertions";
import { createParty } from "@/db/schema/parties";
import { createTicket } from "@/db/schema/tickets";

describe("createTicket", () => {
	it("should create a ticket", async () => {
		const party = await createParty();
		assertNotUndefined(party);

		const ticket = await createTicket({
			name: "Test Ticket",
			description: "Test Description",
			partyId: party.id,
		});

		assertNotUndefined(ticket);

		expect(ticket.name).toBe("Test Ticket");
		expect(ticket.description).toBe("Test Description");
		expect(ticket.partyId).toBe(party.id);
	});

	it("prunes extra whitespace from the name and description", async () => {
		const party = await createParty();
		assertNotUndefined(party);

		const ticket = await createTicket({
			name: "  Test Ticket  ",
			description: "Test Description   ",
			partyId: party.id,
		});
		assertNotUndefined(ticket);

		expect(ticket.name).toBe("Test Ticket");
		expect(ticket.description).toBe("Test Description");
	});

	it("should require a real party id", async () => {
		expect(async () => {
			await createTicket({
				name: "Test Ticket",
				description: "Test Description",
				partyId: 0,
			});
		}).toThrow();
	});
});
