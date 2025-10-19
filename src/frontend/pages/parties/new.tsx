import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Party } from "@/db/schema/parties";

export default function NewPartyPage() {
	const [, navigate] = useLocation();

	const { mutate: createNewParty, isPending } = useMutation({
		mutationFn: async (_formData: FormData) => {
			const response = await fetch("/api/parties", {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Failed to create party");
			}

			return response.json();
		},
		onSuccess: (data: { party: Party }) => {
			navigate(`/parties/${data.party.slug}`);
		},
	});

	return (
		<form action={createNewParty}>
			<button type="submit" disabled={isPending} className="btn btn-primary">
				<span>Start a new Party</span>
				{isPending && (
					<span className="loading loading-spinner loading-xs"></span>
				)}
			</button>
		</form>
	);
}
