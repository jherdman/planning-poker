import { describe, expect, it } from "bun:test";
import sessions from "@/api/sessions";
import { createUser, listUsers } from "@/db/schema/users";

describe("sessions", () => {
	describe("POST /", () => {
		it("should create a new user record", async () => {
			const initialUsers = await listUsers();
			expect(initialUsers.length).toBe(0);

			const request = new Request("http://localhost/sessions", {
				method: "POST",
				body: JSON.stringify({ session: { name: "user" } }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const response = await sessions.handle(request);
			expect(response.status).toBe(201);

			const body = await response.json();
			expect(body).toMatchObject({
				user: {
					id: expect.any(Number),
					name: "user",
					token: expect.any(String),
				},
			});

			const usersAfterNewSession = await listUsers();
			expect(usersAfterNewSession.length).toBe(1);

			const [newUser] = usersAfterNewSession;

			if (!newUser) {
				// Should never happen
				throw new Error("New user not found");
			}

			const cookie = response.headers.get("Set-Cookie");

			expect(cookie).toBeDefined();
			expect(cookie).toContain(`token=${newUser.token}`);
		});

		it("should not create a new user record if the user already exists", async () => {
			const user = await createUser({ name: "user" });

			if (!user) {
				throw new Error("User not created");
			}

			const initialUsers = await listUsers();
			expect(initialUsers.length).toBe(1);

			const request = new Request("http://localhost/sessions", {
				method: "POST",
				body: JSON.stringify({ session: { name: "user" } }),
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${user.token}`,
				},
			});

			const response = await sessions.handle(request);
			expect(response.status).toBe(200);

			const body = await response.json();
			expect(body).toMatchObject({
				user: {
					id: user.id,
					name: "user",
					token: expect.any(String),
				},
			});
		});

		it("should create a new user record if the cookie's token is invalid", async () => {
			const user = await createUser({ name: "user" });

			if (!user) {
				throw new Error("User not created");
			}

			const request = new Request("http://localhost/sessions", {
				method: "POST",
				body: JSON.stringify({ session: { name: "user" } }),
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=invalid`,
				},
			});

			const response = await sessions.handle(request);
			expect(response.status).toBe(201);

			const body = await response.json();
			expect(body).toMatchObject({
				user: {
					id: expect.any(Number),
					name: "user",
					token: expect.any(String),
				},
			});
		});
	});
});
