export * as category from "./category";
export * as level from "./level";

export type {
	Item,
	ItemRaw,
	Slug,
} from "./items";

export {
	_items,
	items,
	slugs,
	map,
	has,
	get,
} from "./items";



import { items, type Item } from "./items";

export const tree = items.reduce((acc, item) => {
	((acc[item.group.slug] ??= {})[item.category.slug] ??= {})[item.slug] = item;
	return acc;
}, {} as Record<string, Record<string, Record<string, Item>>>);
