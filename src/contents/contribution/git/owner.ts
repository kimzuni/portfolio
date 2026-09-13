import { getOwnerUrl } from "./utils";

import * as provider from "./provider";
import type * as repository from "./repository";
import type * as contribution from "../types";



export const _items = [
	{
		provider: "github",
		slug: "thijsvanloef",
	},
	{
		provider: "github",
		slug: "adrienverge",
	},
	{
		provider: "github",
		slug: "elysiajs",
	},
	{
		provider: "github",
		slug: "gaurishhs",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>((x: ItemRaw) => ({
	...x,
	label: x.label || x.slug,
	url: getOwnerUrl(x.provider, x.slug),
	provider: provider.map.get(x.provider)!,
	repositories: [],
	contributions: [],
}));

// 역참조 구성
for (const item of items) {
	item.provider.owners.push(item);
}

export type Slug<
	P extends provider.Slug = provider.Slug,
> = (
	typeof _items[number] extends infer T
		? T extends { provider: P; slug: string }
			? T["slug"]
			: never
		: never
);
export const slugs = _items.map(item => item.slug);

/**
 * key: `${provider.slug}:${owner.slug}`
 */
export const map = new Map(items.map(item => [`${item.provider.slug}:${item.slug}`, item]));



export interface ItemRaw {
	provider: provider.Slug;
	slug: string;
	label?: string;
}

export interface Item extends Omit<ItemRaw, "provider"> {
	url: string;
	provider: provider.Item;
	slug: string;
	label: string;
	repositories: repository.Item[];
	contributions: contribution.Item[];
}
