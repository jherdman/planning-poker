import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams } from "wouter";
import type { Party } from "@/db/schema/parties";

export default function ShowPartyPage() {
	const { partySlug } = useParams();

	if (!partySlug) {
		throw new Error("Party slug is required");
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ShowParty partySlug={partySlug} />
		</Suspense>
	);
}

function ShowParty({ partySlug }: { partySlug: string }) {
	const { data } = useSuspenseQuery<{ party: Party }>({
		queryKey: ["parties", partySlug],
		queryFn: () => fetch(`/api/parties/${partySlug}`).then((res) => res.json()),
	});

	const { party } = data;

	return (
		<div>
			<pre>
				<code>{JSON.stringify(party, null, 2)}</code>
			</pre>
		</div>
	);
}
