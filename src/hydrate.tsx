import { hydrateRoot } from "react-dom/client";
import App from "./frontend/App";
import "./frontend/css/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Could not find root element");
}

hydrateRoot(rootElement, <App />);
