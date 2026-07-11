import * as markdown from "@/lib/markdown";



export const _item = {
	heading: "KIM JOON HEE",
	subheading: "Full-stack Developer",
	tagline: [
		"무언가에 깊게 빠져드는 것을 좋아합니다.",
		"",
		"안정적인 서비스를 위해 필요한 영역은 가리지 않고 직접 부딪히며 배우고 있습니다.",
	],
} as const satisfies ItemRaw;

export const item: Item = {
	..._item,
	tagline: await markdown.render(_item.tagline),
};



export interface ItemRaw {
	heading: string;
	subheading: string;
	tagline: markdown.Source;
}

export interface Item extends Omit<ItemRaw, "tagline"> {
	tagline: markdown.Result;
}
