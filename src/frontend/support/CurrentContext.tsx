import { createContext, type ReactNode, useState } from "react";
import type { User } from "@/db/schema/users";

export const CurrentContext = createContext<{
	user: User | null;
	setUser: (user: User | null) => void;
}>({
	user: null,
	setUser: () => {},
});

export function CurrentContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	return (
		<CurrentContext.Provider value={{ user, setUser }}>
			{children}
		</CurrentContext.Provider>
	);
}
