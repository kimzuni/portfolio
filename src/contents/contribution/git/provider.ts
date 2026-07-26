import { getUrl } from "./utils";

import type * as owner from "./owner";
import type * as repository from "./repository";
import type * as contribution from "../types";



export const _items = [
	{
		slug: "github",
		label: "GitHub",
	},
	{
		slug: "gitlab",
		label: "GitLab",
	},
	{
		slug: "bitbucket",
		label: "Bitbucket",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(x => ({
	...x,
	url: getUrl(x.slug),
	owners: [],
	repositories: [],
	contributions: [],
}));

export type Label = typeof labels[number];
export const labels = _items.map(item => item.label);

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = new Map(items.map(item => [item.slug, item]));



export interface ItemRaw {
	slug: string;
	label: string;
}

export interface Item {
	slug: Slug;
	label: Label;
	url: string;
	owners: owner.Item[];
	repositories: repository.Item[];
	contributions: contribution.Item[];
}
