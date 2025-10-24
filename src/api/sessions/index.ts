import { Elysia, t } from "elysia";
import { createUser, findUserByToken } from "@/db/schema/users";

const COOKIE_SECRET = process.env.COOKIE_SECRET;

if (!COOKIE_SECRET) {
	throw new Error("COOKIE_SECRET is not set");
}

const auth = new Elysia({ name: "auth" }).post(
	"/sessions",
	async ({
		cookie,
		body: {
			session: { name },
		},
		status,
	}) => {
		if (cookie.token.value && cookie.token.value.length > 0) {
			const user = await findUserByToken(cookie.token.value);

			if (user) {
				return status(200, { user });
			} else {
				// Cookie's token is invalid, so we need to remove it
				cookie.token.value = undefined;
			}
		}

		const user = await createUser({ name });

		// TODO: Better error handling
		if (!user) {
			return status(500, { error: "Failed to create user" });
		}

		cookie.token.value = user.token;

		return status("Created", { user });
	},
	{
		cookie: t.Cookie(
			{
				token: t.Optional(t.String()),
			},
			{
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 30, // 30 days
				secrets: [process.env.COOKIE_SECRET],
			},
		),
		body: t.Object({
			session: t.Object({
				name: t.String({ minLength: 1 }),
			}),
		}),
	},
);

export default auth;
