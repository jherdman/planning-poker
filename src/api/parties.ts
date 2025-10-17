import Elysia, { status } from "elysia";
import { createParty, getPartyBySlug } from "@/db/schema/parties";

const parties = new Elysia({ prefix: "/parties" })
	.post("/", async () => {
		const party = await createParty();

		// TODO better error handling
		if (!party) {
			return status(500, { error: "Party not created" });
		}

		return { party };
	})
	.get("/:slug", async ({ params }) => {
		const party = await getPartyBySlug(params.slug);

		if (!party) {
			return status(404, { error: "Party not found" });
		}

		return { party };
	});

export default parties;
