import openapi, { fromTypes } from "@elysiajs/openapi";
import serverTiming from "@elysiajs/server-timing";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import estimations from "./api/estimations";
import parties from "./api/parties";
import requestId from "./api/requestId";
import auth from "./api/sessions";

const app = new Elysia()
	.use(requestId)
	.use(serverTiming())
	.use(openapi({ references: fromTypes() }))
	.group("/api", (app) => app.use(parties).use(estimations).use(auth))
	.use(staticPlugin({ prefix: "/*", indexHTML: true }))
	.listen(3000);

export default app;
