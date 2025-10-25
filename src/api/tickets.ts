import Elysia, { status, t } from "elysia";
import { createTicket } from "@/db/schema/tickets";
import AuthService from "./sessions/service";

const tickets = new Elysia({ prefix: "/tickets" }).use(AuthService).post(
	"/",
	async ({ body: { ticket } }) => {
		const record = await createTicket({
			name: ticket.name,
			partyId: ticket.partyId,
			description: ticket.description,
		});

		if (!record) {
			return status(500, { error: "Failed to create ticket" });
		}

		return status(201, { ticket: record });
	},
	{
		requireAuth: true,
		body: t.Object({
			ticket: t.Object({
				name: t.String({ minLength: 1 }),
				description: t.Optional(t.String()),
				partyId: t.Number(),
			}),
		}),
	},
);

export default tickets;
