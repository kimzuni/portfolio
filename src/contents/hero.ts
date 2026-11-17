import * as markdown from "@/lib/markdown";



export const _item = {
	heading: "KIM JOON HEE",
	subheading: "Penetration Tester",
	tagline: `
		풀스택 개발 경험을 바탕으로 모의해킹을 수행합니다.

		블랙박스 스캔을 넘어 개발자의 시선으로 잠재된 취약점을 찾아냅니다.
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
