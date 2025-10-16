import { Router } from "wouter";
import App from "./frontend/App";
import "./frontend/css/index.css";

interface Props {
	pathname?: string;
	search?: string;
}

/**
 * Entrypoint for React server components
 */
export default function ServerApp({ pathname, search }: Props) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Bun + React</title>
				<link rel="stylesheet" href="/hydrate.css" />
			</head>
			<body className="bg-red-500">
				{/** biome-ignore lint/correctness/useUniqueElementIds: Canonical root element */}
				<div id="root">
					<Router ssrPath={pathname} ssrSearch={search}>
						<App />
					</Router>
				</div>
			</body>
		</html>
	);
}
