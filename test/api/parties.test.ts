import { describe, expect, it } from "bun:test";
import parties from "@/api/parties";
import { createParty } from "@/db/schema/parties";

describe.concurrent("parties", () => {
	describe("POST /", () => {
		it("should create a party", async () => {
			const request = new Request("http://localhost/parties", {
				method: "POST",
			});

			const response = await parties.handle(request);
			const body = await response.json();

			expect(response.status).toBe(200);
			expect(body).toMatchObject({
				party: {
					id: expect.any(Number),
					slug: expect.any(String),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			});
		});
	});

	describe("GET /:slug", () => {
		it("should get a party", async () => {
			const dbParty = await createParty();

			if (!dbParty) {
				throw new Error("Party not created");
			}

			const request = new Request(`http://localhost/parties/${dbParty.slug}`, {
				method: "GET",
			});
			const response = await parties.handle(request);
			const body = await response.json();

			expect(response.status).toBe(200);
			expect(body).toMatchObject({
				party: {
					id: dbParty.id,
					slug: expect.any(String),
				},
			});
		});
	});
});
