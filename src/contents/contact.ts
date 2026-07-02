import type { LinkButtonProps } from "@/components/link-button";



export const _items = [
	{
		variant: "outline",
		icon: "GitHub",
		label: "GitHub",
		href: "https://github.com/kimzuni",
	},
	{
		variant: "outline",
		icon: "GitHub",
		label: "GitHub (Labs)",
		href: "https://github.com/kimzuni-labs",
	},
	{
		variant: "outline",
		icon: "Mail",
		label: "Email",
		href: "mailto:me@zuni.kim",
	},
] as const satisfies ItemRaw[];



export const items: Item[] = [..._items];



export interface ItemRaw extends LinkButtonProps {
}

export interface Item extends ItemRaw {
}
