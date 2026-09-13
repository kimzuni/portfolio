export const _items = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "About",
		href: "/about",
	},
	{
		label: "Skills",
		href: "/skills",
	},
	{
		label: "Projects",
		href: "/projects",
	},
	{
		label: "Contributions",
		href: "/contributions",
	},
] as const satisfies ItemRaw[];



export const items: Item[] = [..._items];



export interface ItemRaw {
	icon?: string;
	label: string;
	href: string;
	disabled?: boolean;
	hidden?: boolean;
	items?: Array<Omit<ItemRaw, "items">>;
}

export interface Item extends ItemRaw {
}
