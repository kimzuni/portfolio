import type * as project from "./items/types";



export interface ItemRaw {
	slug: string;
	label: string;
}


export interface Item extends ItemRaw {
	projects: project.Item[];
}



export const _items = [
	{
		slug: "backend",
		label: "Backend",
	},
	{
		slug: "frontend",
		label: "Frontend",
	},
	{
		slug: "ssr",
		label: "SSR",
	},
	{
		slug: "container",
		label: "Container",
	},
	{
		slug: "cloud",
		label: "Cloud",
	},
	{
		slug: "dev-tools",
		label: "Dev Tools",
	},
	{
		slug: "open-source",
		label: "Open Source",
	},
	{
		slug: "deployed",
		label: "Deployed",
	},
	{
		slug: "published",
		label: "Published",
	},
	{
		slug: "security",
		label: "Security",
	},
	{
		slug: "toy-project",
		label: "Toy Project",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>(x => ({
	...x,
	projects: [],
}));

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = new Map(items.map(item => [item.slug, item]));
