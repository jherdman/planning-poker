import serverTiming from "@elysiajs/server-timing";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import estimations from "./api/estimations";
import parties from "./api/parties";

const app = new Elysia()
	.use(serverTiming())
	.group("/api", (app) => app.use(parties).use(estimations))
	.use(staticPlugin({ prefix: "/*", indexHTML: true }))
	.listen(3000);

export default app;
