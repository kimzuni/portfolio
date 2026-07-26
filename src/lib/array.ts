export const is = (value: unknown): value is unknown[] => Array.isArray(value);

export const to = <
	T,
>(
	value: T | T[] | undefined,
): T[] => (
	is(value)
		? value
		: value !== undefined
			? [value]
			: []
);
