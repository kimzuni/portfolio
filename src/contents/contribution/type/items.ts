import type * as status from "./status";
import type * as contribution from "../types";



export const _items = [
	{
		slug: "pr",
		label: "Pull Request",
		short: "PR",
	},
	{
		slug: "issue",
		label: "Issue",
		short: "Issue",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(x => ({
	...x,
	statuses: [],
	contributions: [],
}));

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export type Label = typeof labels[number];
export const labels = _items.map(item => item.label);

export const map = new Map(items.map(item => [item.slug, item]));



export interface ItemRaw {
	slug: string;
	label: string;
	short: string;
}

export interface Item extends ItemRaw {
	slug: Slug;
	label: Label;
	statuses: status.Item[];
	contributions: contribution.Item[];
}
