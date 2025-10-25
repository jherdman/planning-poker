/**
 * Bun's test framework doesn't type narrow. This funciton helps you avoid doing
 * something like this:
 *
 * ```ts
 * const party = await createParty();
 * if (!party) {
 *   throw new Error("Party not created");
 * }
 * ```
 *
 * Instead, you can do this:
 *
 * ```ts
 * const party = await createParty();
 * assertNotUndefined(party);
 * ```
 *
 * @param value - The value to assert is not undefined.
 * @throws An error if the value is undefined.
 */
export default function assertNotUndefined<T>(
	value: T | undefined,
): asserts value is T {
	if (!value) {
		throw new Error("Value is undefined");
	}
}
