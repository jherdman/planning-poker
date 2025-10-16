import { serve } from "bun";
import { renderToReadableStream } from "react-dom/server";
import { createParty, getPartyBySlug } from "./db/schema/parties";
import ServerApp from "./server";

await Bun.build({
	entrypoints: ["./src/hydrate.tsx"],
	target: "browser",
	outdir: "dist",
	splitting: true,
	minify: {
		identifiers: true,
		syntax: true,
		whitespace: true,
	},
});

const server = serve({
	routes: {
		"/api/parties": {
			async POST(_req) {
				const party = await createParty();

				if (!party) {
					return Response.json({ error: "Party not created" }, { status: 500 });
				}

				return Response.json(party);
			},
		},

		"/api/parties/:id": {
			async GET({ params }) {
				const party = await getPartyBySlug(params.id);

				if (!party) {
					return Response.json({ error: "Party not found" }, { status: 404 });
				}

				return Response.json(party);
			},
		},

		"/api/estimations": {
			async POST(req) {
				console.log("POST /api/estimations");
				const body = await req.json();
				return Response.json({
					body,
				});
			},
		},

		"/api/hello": {
			async GET(_req) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				});
			},
			async PUT(_req) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				});
			},
		},

		"/api/hello/:name": async (req) => {
			const name = req.params.name;
			return Response.json({
				message: `Hello, ${name}!`,
			});
		},

		"/hydrate.js": new Response(Bun.file("./dist/hydrate.js"), {
			headers: {
				"Content-Type": "application/javascript",
			},
		}),

		"/hydrate.css": new Response(Bun.file("./dist/hydrate.css"), {
			headers: {
				"Content-Type": "text/css",
			},
		}),

		"/*": async (req) => {
			const url = new URL(req.url);

			const stream = await renderToReadableStream(
				<ServerApp pathname={url.pathname} search={url.search} />,
				{ bootstrapScripts: ["/hydrate.js"] },
			);

			return new Response(stream, {
				headers: {
					"Content-Type": "text/html",
				},
			});
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: true,

		// Echo console logs from the browser to the server
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
