import { describe, expect, it } from "bun:test";
import Elysia from "elysia";
import assertNotUndefined from "test/support/assertions";
import AuthService from "@/api/sessions/service";
import { createUser } from "@/db/schema/users";

describe("AuthService", () => {
	describe("requireAuth", () => {
		it("responds with 401 if no token is present", async () => {
			const app = new Elysia()
				.use(AuthService)
				.get("/secrets", () => "Hello, world!", {
					requireAuth: true,
				});

			const request = new Request("http://localhost/secrets", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const response = await app.handle(request);

			expect(response.status).toBe(403);
			expect(await response.json()).toMatchObject({
				error: "Forbidden",
			});
		});

		it("provides the user if the token is valid", async () => {
			const user = await createUser({ name: "user" });
			assertNotUndefined(user);

			const app = new Elysia()
				.use(AuthService)
				.get("/secrets", ({ user }) => ({ user }), {
					requireAuth: true,
				});

			const request = new Request("http://localhost/secrets", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${user.token}`,
				},
			});

			const response = await app.handle(request);
			expect(response.status).toBe(200);

			const body = await response.json();
			const { user: userFromResponse } = body;

			expect(userFromResponse).toMatchObject({
				id: user.id,
				name: user.name,
				token: user.token,
			});

			const updatedLastSeenAt = Date.parse(userFromResponse.lastSeenAt);

			expect(updatedLastSeenAt).toBeGreaterThan(user.lastSeenAt.getTime());
		});

		it("responds with 401 if the token is invalid", async () => {
			const app = new Elysia()
				.use(AuthService)
				.get("/secrets", () => "Hello, world!", {
					requireAuth: true,
				});

			const request = new Request("http://localhost/secrets", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=invalid`,
				},
			});

			const response = await app.handle(request);
			expect(response.status).toBe(401);
			expect(await response.json()).toMatchObject({
				error: "Unauthorized",
			});
		});
	});
});
