import type { IconName } from "@/components/icon";



export const _items = [
	{
		icon: "Code2",
		slug: "language-and-runtime",
		label: "Language & Runtime",
	},
	{
		icon: "Server",
		slug: "backend",
		label: "Backend",
	},
	{
		icon: "Monitor",
		slug: "frontend-and-ui",
		label: "Frontend & UI",
	},
	{
		icon: "Database",
		slug: "data-and-storage",
		label: "Data & Storage",
	},
	{
		icon: "Cloud",
		slug: "devops-and-infra",
		label: "DevOps & Infra",
	},
	{
		icon: "Wrench",
		slug: "tools",
		label: "Tools",
	},
	{
		icon: "Box",
		slug: "others",
		label: "Others",
	}
] as const satisfies ItemRaw[];



export const items: Item[] = _items;

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = items.reduce((acc, item) => {
	acc[item.slug] = item;
	return acc;
}, {} as Record<string, Item>);



export const get = (slug: string) => {
	return map[slug];
}

export const has = (slug: string): slug is Slug => {
	return slug in map;
}



export interface ItemRaw {
	icon: IconName;
	color?: string;
	slug: string;
	label: string;
	hidden?: boolean;
}

export interface Item extends ItemRaw {
}
