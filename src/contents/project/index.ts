import type * as seo from "@/lib/seo";

export * as tag from "./tag";
export type * from "./items/types";
export * from "./items";



export const label: string = "Projects";
export const title: string = "프로젝트 목록";
export const description: string = "다양한 기술과 경험을 담은 프로젝트 목록";

export const metadata: seo.MetadataOptions = {
	title,
	description,
};
