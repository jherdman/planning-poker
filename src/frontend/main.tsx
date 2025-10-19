import { Route, Switch } from "wouter";
import "./css/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import PartiesPage from "./pages/parties";
import NewPartyPage from "./pages/parties/new";
import ShowPartyPage from "./pages/parties/show";

const queryClient = new QueryClient();

declare global {
	interface Window {
		__TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
	}
}

if (process.env.NODE_ENV !== "production") {
	window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

/**
 * General app chrome. Keep this minimal.
 */
export function App() {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<div className="bg-slate-300 dark:bg-slate-800 h-screen w-screen">
					<div className="flex flex-col items-center justify-center h-full">
						<Switch>
							<Route path="/parties" component={PartiesPage} />
							<Route path="/parties/new" component={NewPartyPage} />
							<Route path="/parties/:partySlug" component={ShowPartyPage} />
						</Switch>
					</div>
				</div>
			</QueryClientProvider>
		</StrictMode>
	);
}

export default App;
