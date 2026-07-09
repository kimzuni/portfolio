import type { LinkButtonProps } from "@/components/link-button";

import * as app from "./app";



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
		href: `mailto:${app.item.email}`,
	},
] as const satisfies ItemRaw[];

export const _form = {
	enable: true,
	to: app.item.email,
	server: "https://mailer.kimzuni.com",
} as const satisfies FormRaw;



export const items: Item[] = [..._items];
export const form: Form = {
	..._form,
	server: new URL(_form.server),
};



export interface FormRaw {
	enable: boolean;
	to: string;
	server: string;
};

export interface Form extends Omit<FormRaw, "server"> {
	server: URL;
};



export interface ItemRaw extends LinkButtonProps {
}

export interface Item extends ItemRaw {
}
