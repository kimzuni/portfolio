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
		label: "Projects",
		href: "/projects",
	},
	{
		label: "Skills (Coming Soon)",
		href: "/skills",
		disabled: true,
	},
	{
		label: "Contrib... (Coming Soon)",
		href: "/contributions",
		disabled: true,
	},
] as const satisfies ItemRaw[];



export const items: Item[] = [..._items];



export interface ItemRaw {
	icon?: string;
	label: string;
	href: string;
	disabled?: boolean;
	hidden?: boolean;
	items?: Array<Omit<Item, "items">>;
}

export interface Item extends ItemRaw {
}
