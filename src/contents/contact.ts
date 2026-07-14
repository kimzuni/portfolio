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

const checkInterval = 1000 * 60;
export const _form = {
	enable: true,
	to: app.item.email,
	server: "https://mailer.kimzuni.com",
	checkInterval,
	ulist: [
		"수신 메일은 참고용이며 실제 메일 전송 시에는 반영되지 않아요",
		`서버 상태는 ${checkInterval/1000}초에 한 번씩 자동으로 확인해요`,
		"상태 체크 결과를 클릭하면 해당 기능을 활성화 또는 비활성화할 수 있어요",
		"메일은 5초에 한 번씩 전송할 수 있어요",
		"최신 버전의 웹 포트폴리오에서만 메일을 전송할 수 있어요",
	],
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
	checkInterval: number;
	ulist?: string[];
};

export interface Form extends Omit<FormRaw, "server"> {
	server: URL;
};



export interface ItemRaw extends LinkButtonProps {
}

export interface Item extends ItemRaw {
}
