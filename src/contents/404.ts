import type * as seo from "@/lib/seo";
import * as markdown from "@/lib/markdown";

import type { LinkButtonProps } from "@/components/link-button";



export const metadata: seo.MetadataOptions = {
	title: "페이지를 찾을 수 없음",
	description: "요청하신 페이지를 찾을 수 없습니다.",
};



export const _item = {
	messages: [
		"앗, 혹시 길을 잃으셨나요?",
		"집으로 안내해 드릴게요!",
	],
	button: {
		label: "저를 따라오세요!",
		size: "lg",
		icon: "House",
		iconScale: 1.2,
		iconPosition: "right",
	},
} as const satisfies ItemRaw;



export const item: Item = {
	..._item,
	messages: await markdown.render(_item.messages)
};



export interface ItemRaw {
	messages: markdown.Source;
	button: Omit<LinkButtonProps, "href">;
}

export interface Item extends Omit<ItemRaw, "messages"> {
	messages: markdown.Result<ItemRaw["messages"]>;
}
