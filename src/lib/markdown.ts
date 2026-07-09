import { cache } from "react";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
 


type RorU<T, R> = T extends undefined ? undefined : R;

export type Source = string | string[];

export interface Result<S extends Source | undefined = Source | undefined> {
	raw: RorU<S, string[]>;
	text: RorU<S, string>;
	html: RorU<S, string>;
}



const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify);

const renderWithCache = cache(async (value: Source): Promise<Result<Source>> => {
	const raw = getLines(value);
	const text = raw.join("\n");
	const html = String(await processor.process(text));
	return { raw, text, html };
});



export function getLines<S extends Source | undefined>(value: S): RorU<S, string[]>;
export function getLines(value: Source | undefined) {
	if (value === undefined) return undefined;
	return Array.isArray(value) ? value : [value];
}

export async function render<S extends Source | undefined>(value: S): Promise<Result<S>>;
export async function render(value: Source | undefined) {
	const { raw, html } = value === undefined ? {} : await renderWithCache(value);
	return { raw, html };
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
				? Result<V>
				: never
	}
>>;
export async function renders(value: Array<{ [K in string]: Source | undefined }>, key: string) {
	return await Promise.all(value.map(async v => ({
		...v,
		[key]: await render(v[key]),
	})))
}

export async function process<S extends Source | undefined>(value: S): Promise<RorU<S, string>>;
export async function process(value: Source | undefined) {
	return await render(value).then(x => x.html);
}
