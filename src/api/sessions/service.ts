import Elysia from "elysia";
import { findUserByToken, touchLastSeenAt } from "@/db/schema/users";

const AuthService = new Elysia({ name: "auth.service" }).derive(
	{ as: "scoped" },
	async ({ cookie, status }) => {
		if (!cookie?.token?.value || typeof cookie.token.value !== "string") {
			return status("Forbidden", { error: "Forbidden" });
		}

		const user = await findUserByToken(cookie.token.value);

		if (!user) {
			cookie.token.value = undefined;
			return status("Unauthorized", { error: "Unauthorized" });
		}

		await touchLastSeenAt(user);

		return { user };
	},
);

export default AuthService;
