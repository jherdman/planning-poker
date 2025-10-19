/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `public/index.html`.
 */

import { createRoot } from "react-dom/client";
import { App } from "@/frontend/main";

function start() {
	// biome-ignore lint/style/noNonNullAssertion: Canonical handling for finding the root element
	const root = createRoot(document.getElementById("root")!);
	root.render(<App />);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", start);
} else {
	start();
}
