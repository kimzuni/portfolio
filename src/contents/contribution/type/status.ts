import type { IconName } from "@/components/icon";

import * as type from "./items";
import type * as contribution from "../types";



export const _items = [
	{
		slug: "pr:open",
		type: "pr",
		label: "Open",
		color: "var(--color-emerald-500)",
		icon: "GitPullRequestArrow",
	},
	{
		slug: "pr:merged",
		type: "pr",
		label: "Merged",
		color: "var(--color-purple-500)",
		icon: "GitMerge",
	},
	{
		slug: "pr:closed",
		type: "pr",
		label: "Closed",
		color: "var(--color-red-600)",
		icon: "GitPullRequestClosed",
	},

	{
		slug: "issue:open",
		type: "issue",
		label: "Open",
		color: "var(--color-emerald-500)",
		icon: "CircleDot",
	},
	{
		slug: "issue:closed",
		type: "issue",
		label: "Closed",
		color: "var(--color-purple-500)",
		icon: "CircleCheck",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(x => ({
	...x,
	type: type.map.get(x.type)!,
	contributions: [],
}));

// 역참조 구성
for (const item of items) {
	item.type.statuses.push(item);
}

export type Slug<T extends type.Slug = type.Slug> = typeof slugs[number] extends infer U
	? U extends `${T}:${string}`
		? U
		: never
	: never;
export const slugs = _items.map(item => item.slug);

export const map = new Map(items.map(item => [item.slug, item]));



export interface ItemRaw {
	slug: string;
	type: type.Slug;
	label: string;
	color: string;
	icon: IconName;
}

export interface Item extends Omit<ItemRaw, "type"> {
	slug: Slug;
	type: type.Item;
	contributions: contribution.Item[];
}
