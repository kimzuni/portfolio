import type { IconName } from "@/components/icon";

import * as group from "./group";



export const _items = [
	{
		icon: "Code2",
		group: "language-and-runtime",
		slug: "language",
		label: "Language",
	},
	{
		icon: "Zap",
		group: "language-and-runtime",
		slug: "runtime",
		label: "Runtime",
	},



	{
		icon: "Server",
		group: "backend",
		slug: "framework",
		label: "Framework",
	},



	{
		icon: "BookMarked",
		group: "frontend-and-ui",
		slug: "markup",
		label: "Markup",
	},
	{
		icon: "Palette",
		group: "frontend-and-ui",
		slug: "style",
		label: "Style",
	},
	{
		icon: "SquareStack",
		group: "frontend-and-ui",
		slug: "framework",
		label: "Framework",
	},
	{
		icon: "LibraryBig",
		group: "frontend-and-ui",
		slug: "library",
		label: "Library",
	},
	{
		icon: "FileText",
		group: "frontend-and-ui",
		slug: "static-site-generator",
		label: "Static Site Generator",
	},



	{
		icon: "Database",
		group: "data-and-storage",
		slug: "database",
		label: "Database",
	},
	{
		icon: "Database",
		group: "data-and-storage",
		slug: "cache",
		label: "Cache",
	},
	{
		icon: "Database",
		group: "data-and-storage",
		slug: "orm",
		label: "ORM",
	},



	{
		icon: "Terminal",
		group: "devops-and-infra",
		slug: "os-shell",
		label: "OS & Shell",
	},
	{
		icon: "Cloud",
		group: "devops-and-infra",
		slug: "cloud-container",
		label: "Cloud & Container",
	},
	{
		icon: "Infinity",
		group: "devops-and-infra",
		slug: "ci-cd",
		label: "CI/CD",
	},



	{
		icon: "Handshake",
		group: "tools",
		slug: "collaboration",
		label: "Collaboration",
	},
	{
		icon: "Package",
		group: "tools",
		slug: "package",
		label: "Package",
	},
	{
		icon: "Construction",
		group: "tools",
		slug: "build",
		label: "Build",
	},
	{
		icon: "Network",
		group: "tools",
		slug: "network",
		label: "Network",
	},
	{
		icon: "TestTubeDiagonal",
		group: "tools",
		slug: "testing",
		label: "Testing",
	},



	{
		icon: "Bot",
		group: "others",
		slug: "ai",
		label: "AI",
	},
	{
		icon: "Gamepad2",
		group: "others",
		slug: "game-dev",
		label: "Game Dev",
	},
] as const satisfies ItemRaw[];



export const items: Item[] = _items.map(item => ({
	...item,
	group: group.get(item.group)!,
}));

export type Slug<
	G extends group.Slug = group.Slug,
> = (
	typeof _items[number] extends infer T
		? T extends { group: G; slug: string }
			? T["slug"]
			: never
		: never
);

export const slugs = _items.map(item => item.slug);

export const map = items.reduce((acc, item) => {
	(acc[item.group.slug] ??= {})[item.slug] = item;
	return acc;
}, {} as Record<string, Record<string, Item>>);



export const get = (group: string, slug: string) => {
	return map[group]?.[slug];
}

export const has = (slugs: [string, string]): slugs is [group.Slug, Slug] => {
	return !!get(...slugs);
}

export const filter = (group: string) => {
	const value = map[group];
	return value && Object.values(value);
}



export interface ItemRaw {
	group: group.Slug;
	icon: IconName;
	color?: string;
	slug: string;
	label: string;
	hidden?: boolean;
}

export interface Item extends Omit<ItemRaw, "group"> {
	group: group.Item;
}
