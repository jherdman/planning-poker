import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Party } from "@/db/schema/parties";

export default function NewPartyPage() {
	const [, navigate] = useLocation();

	const { mutate: createNewParty, isPending } = useMutation({
		mutationFn: (_formData: FormData) =>
			fetch("/api/parties", {
				method: "POST",
			}).then((res) => res.json()),
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
