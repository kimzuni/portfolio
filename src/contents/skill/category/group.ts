import type { IconName } from "@/components/icon";

import type * as category from "./items";
import type * as skill from "../items";



export const _items = [
	{
		color: "var(--color-blue-500)",
		icon: "CodeXml",
		slug: "languages",
		label: "Languages",
	},
	{
		color: "var(--color-pink-500)",
		icon: "MonitorSmartphone",
		slug: "frontend",
		label: "Frontend",
	},
	{
		color: "var(--color-emerald-500)",
		icon: "Server",
		slug: "backend",
		label: "Backend",
	},
	{
		color: "var(--color-amber-500)",
		icon: "Database",
		slug: "data-storage",
		label: "Data & Storage",
	},
	{
		color: "var(--color-violet-500)",
		icon: "Cloud",
		slug: "devops-infra",
		label: "DevOps & Infra",
	},
	{
		color: "var(--color-indigo-500)",
		icon: "Wrench",
		slug: "tools-core",
		label: "Tools & Core",
	},
	{
		color: "var(--color-slate-500)",
		icon: "FolderGit2",
		slug: "others",
		label: "Others",
	}
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(x => ({
	...x,
	categories: [],
	skills: [],
}));

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = new Map(items.map(item => [item.slug, item]));


export interface ItemRaw {
	icon: IconName;
	color: string;
	slug: string;
	label: string;
	hidden?: boolean;
}

export interface Item extends ItemRaw {
	slug: Slug;
	categories: category.Item[];
	skills: skill.Item[];
}
