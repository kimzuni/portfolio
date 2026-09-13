
import { cache } from "react";
import * as runtime from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeReact, { type Components } from "rehype-react";

import * as array from "@/lib/array";

import { ContentLink } from "@/components/content-link";



const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeReact, {
		...runtime,
		components: {
			a: ContentLink,
		} satisfies Components,
	});

const process = cache(
	(lines: string[]): Promise<React.ReactNode> => processor
		.process(lines.join("\n"))
		.then(({ result }: { result: React.ReactNode }) => result)
);



export type Source = string | string[];

interface BaseResult {
	raw: Source;
	lines: string[];
	result: React.ReactNode;
}

type AllUndefined<T> = { [K in keyof T]: undefined };

export type Result = BaseResult | AllUndefined<BaseResult>;



const SPACE_REGEXP = /^\s*/;
const NEW_LINE_REGEXP = /\r?\n/;

export const getLines = (value: Source | undefined): Result["lines"] => {
	const detectSpaceLength = (line: string) => {
		return line.match(SPACE_REGEXP)?.[0].length ?? 0
	}

	let spaceLength: number | undefined;
	const arr: string[] = [];
	for (const item of array.to(value)) {
		const split = item.split(NEW_LINE_REGEXP);
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
	const result = lines ? await process(lines) : undefined;
	if (!raw || !lines) {
		return {
			raw: undefined,
			lines: undefined,
			result: undefined,
		};
	}
	return { raw, lines, result };
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
