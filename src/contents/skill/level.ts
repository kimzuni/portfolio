import type * as skill from "./items";



const _items = [
	{
		slug: 0,
		label: "☆☆☆☆☆",
		color: "var(--color-gray-400)",
	},
	{
		slug: 0.5,
		label: "⯪☆☆☆☆",
		color: "var(--color-slate-400)",
	},
	{
		slug: 1.0,
		label: "★☆☆☆☆",
		color: "var(--color-amber-400)",
	},
	{
		slug: 1.5,
		label: "★⯪☆☆☆",
		color: "var(--color-lime-500)",
	},
	{
		slug: 2.0,
		label: "★★☆☆☆",
		color: "var(--color-emerald-500)",
	},
	{
		slug: 2.5,
		label: "★★⯪☆☆",
		color: "var(--color-sky-500)",
	},
	{
		slug: 3.0,
		label: "★★★☆☆",
		color: "var(--color-blue-600)",
	},
	{
		slug: 3.5,
		label: "★★★⯪☆",
		color: "var(--color-indigo-500)",
	},
	{
		slug: 4.0,
		label: "★★★★☆",
		color: "var(--color-violet-600)",
	},
	{
		slug: 4.5,
		label: "★★★★⯪",
		color: "var(--color-purple-600)",
	},
	{
		slug: 5.0,
		label: "★★★★★",
		color: "var(--color-rose-500)",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>((item) => ({
	...item,
	skills: [],
}));

export type Slug = typeof slugs[number];
export const slugs = _items.map(item => item.slug);

export const map = new Map(items.map(item => [item.slug, item]));



export const normalize = (level: number) => {
	level = Math.round(level * 2) / 2;
	level = Math.max(0, Math.min(5, level));
	return level;
};



export interface ItemRaw {
	/**
	 * 0~5, step 0.5
	 */
	slug: number;
	label: string;
	color: string;
	hidden?: boolean;
}

export interface Item extends ItemRaw {
	slug: Slug;
	skills: skill.Item[];
}
