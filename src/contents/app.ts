import * as markdown from "@/lib/markdown";



export const _item = {
	mode: process.env.NODE_ENV,
	url: "https://zuni.kim",
	email: "me@zuni.kim",
	service: "web-portfolio",
	title: "kimzuni - 웹 포트폴리오",
	description: "풀스택 개발자 김준희의 웹 포트폴리오입니다.",
	buildTime: Number(process.env.BUILD_TIME),
} as const satisfies ItemRaw;



export const item: Item = {
	..._item,
	description: await markdown.render(_item.description),
	buildTime: new Date(_item.buildTime),
	url: new URL(_item.url),
};



export interface ItemRaw {
	mode: typeof process.env.NODE_ENV
	url: string;
	email: string;
	service: string;
	title: string;
	description: markdown.Source;
	buildTime: number;
}

export interface Item extends Omit<ItemRaw, "description" | "buildTime" | "url"> {
	description: markdown.Result<ItemRaw["description"]>;
	buildTime: Date;
	url: URL;
}
