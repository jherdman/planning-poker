import { Link } from "wouter";

export default function PartiesIndex() {
	return (
		<div className="p-8 bg-blue-500 text-white">
			<p className="text-xl font-bold">I like parties</p>
			<Link to="/parties/new" className="text-yellow-300 underline">
				new party
			</Link>
		</div>
	);
}
