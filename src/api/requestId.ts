import { randomUUIDv7 } from "bun";
import Elysia from "elysia";

/**
 * Sets X-Request-Id header
 */
const requestId = new Elysia({ name: "RequestId" })
	.onRequest(({ set }) => {
		set.headers["X-Request-Id"] = randomUUIDv7("base64url");
	})
	.derive(({ set }) => {
		return {
			requestId: set.headers["X-Request-Id"],
		};
	});

export default requestId;
