import { StrictMode } from "react";
import { Route, Router, Switch } from "wouter";
import Parties from "./parties";
import NewParty from "./parties/new";

export function App() {
	return (
		<StrictMode>
			<Router>
				<Switch>
					<Route path="/" component={Parties} />
					<Route path="/parties/new" component={NewParty} />
				</Switch>
			</Router>
		</StrictMode>
	);
}

export default App;
