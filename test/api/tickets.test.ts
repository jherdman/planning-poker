import { describe, expect, it } from "bun:test";
import assertNotUndefined from "test/support/assertions";
import tickets from "@/api/tickets";
import { createParty } from "@/db/schema/parties";
import { createTicket } from "@/db/schema/tickets";
import { createUser } from "@/db/schema/users";

describe("tickets", () => {
	describe("POST /", () => {
		it("should create a ticket", async () => {
			const party = await createParty();
			assertNotUndefined(party);

			const ticket = await createTicket({ name: "ticket", partyId: party.id });
			assertNotUndefined(ticket);

			const user = await createUser({ name: "user" });
			assertNotUndefined(user);

			const request = new Request("http://localhost/tickets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${user.token}`,
				},
				body: JSON.stringify({ ticket: { name: "ticket", partyId: party.id } }),
			});

			const response = await tickets.handle(request);
			const body = await response.json();

			expect(response.status).toBe(201);
			expect(body).toMatchObject({
				ticket: {
					id: expect.any(Number),
					name: "ticket",
					partyId: party.id,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			});
		});
	});
});
