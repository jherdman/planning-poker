import Elysia, { t } from "elysia";
import { findUserByToken, touchLastSeenAt } from "@/db/schema/users";

const AuthService = new Elysia({ name: "auth.service" }).macro("requireAuth", {
	cookie: t.Cookie({
		token: t.String(),
	}),
	beforeHandle: ({ cookie, status, set }) => {
		if (typeof cookie.token.value !== "string") {
			set.headers["www-authenticate"] = "Bearer";
			return status(401, { error: "Unauthorized" });
		}
	},
	resolve: async ({ cookie, status }) => {
		const user = await findUserByToken(cookie.token.value);

		if (!user) {
			return status(401, { error: "Unauthorized" });
		}

		await touchLastSeenAt(user.token);

		return { user };
	},
});

export default AuthService;
