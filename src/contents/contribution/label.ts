import type * as contribution from "./types";



export const _items = [
	{
		slug: "feat",
		label: "Feature",
		color: "var(--color-green-600)",
	},
	{
		slug: "bug",
		label: "Bug",
		color: "var(--color-red-600)",
	},
	{
		slug: "refactor",
		label: "Refactor",
		color: "var(--color-sky-600)",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(x => ({
	...x,
	contributions: [],
}));

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = new Map(items.map(item => [item.slug, item]));



export interface ItemRaw {
	slug: string;
	label: string;
	color: string;
}

export interface Item extends ItemRaw {
	slug: Slug;
	contributions: contribution.Item[];
}
