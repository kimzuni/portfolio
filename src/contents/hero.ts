import * as markdown from "@/lib/markdown";



export const _item = {
	heading: "KIM JOON HEE",
	subheading: "Full-stack Developer",
	tagline: `
		보안 전공자로서 사용자가 신뢰할 수 있는 서비스를 개발합니다.

		코드를 통해 보다 더 나은 사용자 경험을 구현하는 데 집중합니다.
	`,
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
