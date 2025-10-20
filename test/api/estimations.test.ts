import { describe, expect, it } from "bun:test";
import estimations from "@/api/estimations";
import { createParty } from "@/db/schema/parties";
import { createUser } from "@/db/schema/users";

describe("estimations", () => {
	describe("POST /", () => {
		it("should create an estimation", async () => {
			const party = await createParty();
			const user = await createUser({ name: "user" });

			if (!party) {
				throw new Error("Party not created");
			}
			if (!user) {
				throw new Error("User not created");
			}

			const request = new Request("http://localhost/estimations", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${user.token}`,
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
					userId: user.id,
				},
			});
		});
	});
});
