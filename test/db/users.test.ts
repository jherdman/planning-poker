import { describe, expect, it } from "bun:test";
import assertNotUndefined from "test/support/assertions";
import {
	createUser,
	findUserByToken,
	touchLastSeenAt,
} from "@/db/schema/users";

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

describe("touchLastSeenAt", () => {
	it("should touch the last seen at timestamp for a user", async () => {
		const user = await createUser({ name: "John Doe" });

		assertNotUndefined(user);
		const originalLastSeenAt = user.lastSeenAt;

		await touchLastSeenAt(user);

		expect(user.lastSeenAt.getTime()).toBeGreaterThan(
			originalLastSeenAt.getTime(),
		);

		const updatedUser = await findUserByToken(user.token);
		assertNotUndefined(updatedUser);

		expect(updatedUser.lastSeenAt.getTime()).toEqual(user.lastSeenAt.getTime());
	});
});
