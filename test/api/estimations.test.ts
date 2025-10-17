import { describe, expect, it } from "bun:test";
import estimations from "@/api/estimations";
import { createParty } from "@/db/schema/parties";

describe("estimations", () => {
	describe("POST /", () => {
		it("should create an estimation", async () => {
			const party = await createParty();

			if (!party) {
				throw new Error("Party not created");
			}

			const request = new Request("http://localhost/estimations", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ estimation: 100, partyId: 1 }),
			});

			const response = await estimations.handle(request);
			const body = await response.json();

			expect(response.status).toBe(200);
			expect(body).toMatchObject({
				estimation: {
					id: expect.any(Number),
					estimation: 100,
					partyId: party.id,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			});
		});
	});
});
