import type { IconName } from "@/components/icon";

import * as group from "./group";
import type * as skill from "../items";



export const _items = [
	{
		color: "var(--color-blue-400)",
		icon: "FileCode",
		group: "languages",
		slug: "programming",
		label: "Programming",
	},
	{
		color: "var(--color-pink-400)",
		icon: "Paintbrush",
		group: "languages",
		slug: "markup-style",
		label: "Markup & Style",
	},
	{
		color: "var(--color-emerald-400)",
		icon: "Terminal",
		group: "languages",
		slug: "shell",
		label: "Shell",
	},



	{
		color: "var(--color-pink-400)",
		icon: "LayoutTemplate",
		group: "frontend",
		slug: "frontend-frameworks",
		label: "frameworks",
	},
	{
		color: "var(--color-purple-400)",
		icon: "Palette",
		group: "frontend",
		slug: "styling-ui",
		label: "Styling & UI",
	},
	{
		color: "var(--color-amber-400)",
		icon: "Puzzle",
		group: "frontend",
		slug: "frontend-libraries",
		label: "Libraries",
	},
	{
		color: "var(--color-teal-500)",
		icon: "PanelTop",
		group: "frontend",
		slug: "static-sites",
		label: "Static Sites",
	},



	{
		color: "var(--color-emerald-400)",
		icon: "Cpu",
		group: "backend",
		slug: "runtimes",
		label: "runtimes",
	},
	{
		color: "var(--color-teal-400)",
		icon: "Network",
		group: "backend",
		slug: "backend-frameworks",
		label: "Frameworks",
	},



	{
		color: "var(--color-amber-400)",
		icon: "HardDrive",
		group: "data-storage",
		slug: "databases",
		label: "Databases",
	},
	{
		color: "var(--color-yellow-400)",
		icon: "Zap",
		group: "data-storage",
		slug: "cache",
		label: "Cache",
	},
	{
		color: "var(--color-orange-400)",
		icon: "Waypoints",
		group: "data-storage",
		slug: "orms",
		label: "ORMs",
	},



	{
		color: "var(--color-violet-400)",
		icon: "Container",
		group: "devops-infra",
		slug: "System-containers",
		label: "System & Containers",
	},
	{
		color: "var(--color-sky-400)",
		icon: "Cloud",
		group: "devops-infra",
		slug: "Cloud-hosting",
		label: "Cloud & Hosting",
	},
	{
		color: "var(--color-rose-400)",
		icon: "Infinity",
		group: "devops-infra",
		slug: "ci-cd",
		label: "CI/CD",
	},



	{
		color: "var(--color-indigo-400)",
		icon: "GitBranch",
		group: "tools-core",
		slug: "version-control",
		label: "Version Control",
	},
	{
		color: "var(--color-lime-400)",
		icon: "Package",
		group: "tools-core",
		slug: "package-managers",
		label: "Package Managers",
	},
	{
		color: "var(--color-purple-400)",
		icon: "Zap",
		group: "tools-core",
		slug: "build",
		label: "Build",
	},
	{
		color: "var(--color-green-400)",
		icon: "TestTube",
		group: "tools-core",
		slug: "testing",
		label: "Testing",
	},
	{
		color: "var(--color-blue-400)",
		icon: "Cable",
		group: "tools-core",
		slug: "network-api",
		label: "Network & API",
	},



	{
		color: "var(--color-sky-400)",
		icon: "Blocks",
		group: "others",
		slug: "extensions",
		label: "Extensions",
	},
	{
		color: "var(--color-violet-500)",
		icon: "Bot",
		group: "others",
		slug: "ai",
		label: "AI",
	},
	{
		color: "var(--color-orange-400)",
		icon: "Gamepad2",
		group: "others",
		slug: "game-dev",
		label: "Game Dev",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(item => ({
	...item,
	group: group.map.get(item.group)!,
	skills: [],
}));

// 역참조 구성
for (const item of items) {
	item.group.categories.push(item);
}

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

export const map = new Map(items.map(item => [item.slug, item]));



export interface ItemRaw {
	group: group.Slug;
	icon: IconName;
	color: string;
	slug: string;
	label: string;
	hidden?: boolean;
}

export interface Item extends Omit<ItemRaw, "group"> {
	group: group.Item;
	slug: Slug;
	skills: skill.Item[];
}
