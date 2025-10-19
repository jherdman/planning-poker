import { useQuery } from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "wouter";
import type { Party } from "@/db/schema/parties";

export default function PartiesPage() {
	const [, navigate] = useLocation();
	const [partySlug, setPartySlug] = useState<string | null>(null);
	const partyCodeId = useId();

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
		<article>
			<h1>Join a party</h1>

			<form action={selectParty}>
				<fieldset className="fieldset">
					<div className="join">
						<label htmlFor={partyCodeId} className="sr-only">
							Party code
						</label>
						<input
							id={partyCodeId}
							type="text"
							className="input join-item"
							placeholder="Party code"
							name="partySlug"
							required
							disabled={isFetching}
						/>
						<button
							type="submit"
							disabled={isFetching}
							className="btn btn-primary join-item"
						>
							<span>Join</span>
							{isFetching && (
								<span className="loading loading-spinner loading-xs"></span>
							)}
						</button>
					</div>
				</fieldset>
			</form>

			<p>
				or{" "}
				<Link href="/parties/new" className="link link-primary">
					start a new party
				</Link>
			</p>
		</article>
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
