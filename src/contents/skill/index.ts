import type * as seo from "@/lib/seo";

export * as category from "./category";
export * as level from "./level";
export * from "./items";



export const label: string = "Skills";
export const title: string = "기술 스택";
export const description: string = "사용 가능한 기술 스택의 전체 목록";

export const metadata: seo.MetadataOptions = {
	title,
	description,
};
