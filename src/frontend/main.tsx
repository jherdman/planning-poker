import { Route, Switch } from "wouter";
import "./css/index.css";
import NewPartyPage from "./pages/parties/new";
import ShowPartyPage from "./pages/parties/show";

/**
 * General app chrome. Keep this minimal.
 */
export function App() {
	return (
		<div className="bg-slate-300 dark:bg-slate-800 h-screen w-screen">
			<div className="flex flex-col items-center justify-center h-full">
				<Switch>
					<Route path="/parties/new" component={NewPartyPage} />
					<Route path="/parties/:partySlug" component={ShowPartyPage} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
