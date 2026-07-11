export type Source = string | string[];

interface BaseResult {
	raw: Source;
	lines: string[];
}

type AllUndefined<T> = { [K in keyof T]: undefined };

export type Result = BaseResult | AllUndefined<BaseResult>;



const SPACE_REGEXP = /^\s*/;
const NEW_LINE_REGEXP = /\r?\n/;

export const getLines = (value: Source | undefined): Result["lines"] => {
	let tmp: string[];
	if (typeof value === "string") {
		tmp = [value];
	} else if (Array.isArray(value) && value[0] !== undefined) {
		tmp = value;
	} else {
		return undefined;
	}

	const detectSpaceLength = (line: string) => {
		return line.match(SPACE_REGEXP)?.[0].length ?? 0
	}

	let spaceLength: number | undefined;
	const arr: string[] = [];
	for (const x of tmp) {
		const split = x.split(NEW_LINE_REGEXP);
		for (let line of split) {
			if (spaceLength === undefined && !line.trim()) {
				continue;
			}
			spaceLength ??= detectSpaceLength(line);

			line = line.slice(spaceLength);
			arr.push(line);
		}
	}
	return arr;
};

export async function render(raw: Source | undefined): Promise<Result> {
	const lines = getLines(raw);
	if (!raw || !lines) {
		return {
			raw: undefined,
			lines: undefined,
		};
	}
	return { raw, lines };
}

export async function renders<
	T,
	K extends keyof T,
	V extends T[K] extends Source | undefined ? T[K] : never,
>(
	value: T[],
	key: K,
): Promise<Array<
	& Omit<T, K>
	& {
		[P in K]:
			V extends Source | undefined
				? Result
				: never
	}
>>;
export async function renders(value: Array<Record<string, Source | undefined>>, key: string) {
	return await Promise.all(value.map(async v => ({
		...v,
		[key]: await render(v[key]),
	})))
}
