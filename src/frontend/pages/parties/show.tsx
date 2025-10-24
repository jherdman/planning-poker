import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useContext, useId } from "react";
import { useParams } from "wouter";
import type { Party } from "@/db/schema/parties";
import type { User } from "@/db/schema/users";
import { CurrentContext } from "@/frontend/support/CurrentContext";

export default function ShowPartyPage() {
	const { partySlug } = useParams();
	const { user } = useContext(CurrentContext);

	if (!partySlug) {
		throw new Error("Party slug is required");
	}

	if (user) {
		return (
			<Suspense fallback={<div>Loading...</div>}>
				<ShowParty partySlug={partySlug} />
			</Suspense>
		);
	}

	return <StartNewSession />;
}

function StartNewSession() {
	const { setUser } = useContext(CurrentContext);
	const nameId = useId();

	const { mutate: createNewSession, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			const body = { session: { name: formData.get("name") } };

			const response = await fetch("/api/sessions", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error("Failed to create session");
			}

			return response.json();
		},
		onSuccess: (data: { user: User }) => {
			setUser(data.user);
		},
	});

	return (
		<form action={createNewSession}>
			<div className="join">
				<div>
					<label className="input validator join-item">
						<input
							name="name"
							type="text"
							placeholder="Your name"
							required
							id={nameId}
							disabled={isPending}
							autoComplete="given-name"
						/>
					</label>
					<div className="validator-hint hidden">Enter your name</div>
				</div>
				<button
					type="submit"
					disabled={isPending}
					className="btn btn-primary join-item"
				>
					Join
				</button>
			</div>
		</form>
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
