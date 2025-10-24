import { describe, expect, it } from "bun:test";
import { createUser, findUserByToken } from "@/db/schema/users";

describe("createUser", () => {
	it("should create a user", async () => {
		const user = await createUser({ name: "John Doe" });

		if (!user) {
			throw new Error("User not created");
		}

		expect(user).toBeDefined();
		expect(user.name).toBe("John Doe");
		expect(user.token).toBeDefined();
		expect(user.createdAt).toBeDefined();
		expect(user.updatedAt).toBeDefined();
		expect(user.lastSeenAt).toBeDefined();
	});
});

describe("findUserByToken", () => {
	it("should find a user by their token", async () => {
		const user = await createUser({ name: "John Doe" });

		if (!user) {
			throw new Error("User not created");
		}

		const foundUser = await findUserByToken(user.token);

		expect(foundUser).toBeDefined();
		expect(foundUser?.name).toBe("John Doe");
	});
});
