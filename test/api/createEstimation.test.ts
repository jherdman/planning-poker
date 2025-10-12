import { describe, expect, it } from "bun:test";
import createEstimateHandler from "@/api/createEstimate";

describe("creating an estimation", () => {
	it("should create an estimation", async () => {
		const request = new Request("http://localhost", {
			method: "POST",
			body: JSON.stringify({ estimation: 100 }),
		});

		const response = await createEstimateHandler(request);
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body).toEqual({ estimation: 100 });
	});
});
