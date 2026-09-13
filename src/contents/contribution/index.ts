import type * as seo from "@/lib/seo";

export * as git from "./git";
export * as type from "./type";
export * as itemLabel from "./label";
export * from "./items";
export type * from "./types";



export const label: string = "Contributions";
export const title: string = "오픈소스 기여";
export const description: string = "오픈소스 생태계에 기여한 PR, Issue 등 활동 내역";

export const metadata: seo.MetadataOptions = {
	title,
	description,
};
