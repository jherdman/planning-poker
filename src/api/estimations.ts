import Elysia, { status, t } from "elysia";
import { createEstimation } from "@/db/schema/estimates";

const estimations = new Elysia({ prefix: "/estimations" }).post(
	"/",
	async ({ body }) => {
		const estimation = await createEstimation({
			estimation: body.estimation,
			partyId: body.partyId,
		});

		if (!estimation) {
			return status(500, { error: "Failed to create estimation" });
		}

		return { estimation };
	},
	{
		body: t.Object({
			estimation: t.Number(),
			partyId: t.Number(),
		}),
	},
);

export default estimations;
