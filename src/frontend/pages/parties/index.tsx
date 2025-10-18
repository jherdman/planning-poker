import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import type { Party } from "@/db/schema/parties";

export default function PartiesPage() {
	const [, navigate] = useLocation();
	const [partySlug, setPartySlug] = useState<string | null>(null);

	const selectParty = (formData: FormData) => {
		const selectedPartySlug = formData.get("partySlug") as string;
		setPartySlug(selectedPartySlug);
	};

	const { data, isFetching } = useQuery({
		enabled: !!partySlug,
		queryKey: ["parties", partySlug],
		queryFn: () => findParty(partySlug),
	});

	useEffect(() => {
		if (data?.party) {
			navigate(`/parties/${data.party.slug}`);
		}
	}, [data, navigate]);

	return (
		<form action={selectParty}>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Join a party</legend>
				<input
					type="text"
					className="input"
					placeholder="Party slug"
					name="partySlug"
					required
					disabled={isFetching}
				/>
				<button type="submit" disabled={isFetching} className="btn btn-primary">
					<span>Join</span>
					{isFetching && (
						<span className="loading loading-spinner loading-xs"></span>
					)}
				</button>
			</fieldset>

			<p>
				or <Link href="/parties/new">start a new party</Link>
			</p>
		</form>
	);
}

async function findParty(partySlug: string | null) {
	if (!partySlug) {
		return null;
	}

	const response = await fetch(`/api/parties/${partySlug}`);

	if (!response.ok) {
		throw new Error(`Could not find party ${partySlug}`);
	}

	return (await response.json()) as unknown as { party: Party };
}
