import Elysia, { status, t } from "elysia";
import { createEstimation } from "@/db/schema/estimates";
import AuthService from "./sessions/service";

const estimations = new Elysia({ prefix: "/estimations" })
	.use(AuthService)
	.post(
		"/",
		async ({ body, user }) => {
			const estimation = await createEstimation({
				estimation: body.estimation,
				partyId: body.partyId,
				userId: user.id,
			});

			if (!estimation) {
				return status(500, { error: "Failed to create estimation" });
			}

			return { estimation };
		},
		{
			requireAuth: true,
			body: t.Object({
				estimation: t.Number(),
				partyId: t.Number(),
			}),
		},
	);

export default estimations;
