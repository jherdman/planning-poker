import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import estimations from "./api/estimations";
import parties from "./api/parties";

const app = new Elysia()
	.use(staticPlugin({ prefix: "/" }))
	.group("/api", (app) => app.use(parties).use(estimations))
	.listen(3000);

export default app;
