export interface ItemRaw {
	slug: string;
	label: string;
}


export interface Item extends ItemRaw {
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
		slug: "container",
		label: "Container",
	},
	{
		slug: "deployment",
		label: "Deployment",
	},
	{
		slug: "package",
		label: "Package",
	},
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
