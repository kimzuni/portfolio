import * as markdown from "@/lib/markdown";



const _items = [
	{
		slug: 0,
		label: "☆☆☆☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 0.5,
		label: "⯪☆☆☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 1.0,
		label: "★☆☆☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 1.5,
		label: "★⯪☆☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 2.0,
		label: "★★☆☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 2.5,
		label: "★★⯪☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 3.0,
		label: "★★★☆☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 3.5,
		label: "★★★⯪☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 4.0,
		label: "★★★★☆",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 4.5,
		label: "★★★★⯪",
		color: "#e0e0e0",
		description: [
		],
	},
	{
		slug: 5.0,
		label: "★★★★★",
		color: "#e0e0e0",
		description: [
		],
	},
] as const satisfies ItemRaw[];



export const items: Item[] = await markdown.renders(
	_items,
	"description",
);

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = items.reduce((acc, item) => {
	acc[item.slug] = item;
	return acc;
}, {} as Record<number, Item>);



export const normalize = (level: number) => {
	level = Math.round(level * 2) / 2;
	level = Math.max(0, Math.min(5, level));
	return level;
};

export const get = (level: Slug) => {
	return map[level]!;
}

export const has = (level: number): level is Slug => {
	return level in map;
}



export interface ItemRaw {
	/**
	 * 0~5, step 0.5
	 */
	slug: number;
	label: string;
	color: string;
	description?: markdown.Source;
	hidden?: boolean;
}

export interface Item extends Omit<ItemRaw, "description"> {
	description: markdown.Result<ItemRaw["description"]>;
}
