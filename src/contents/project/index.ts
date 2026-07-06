import type * as seo from "@/lib/seo";

export * as tag from "./tag";

export type {
	TeamRaw,
	Team,
	ContributionRaw,
	Contribution,
	BlockRaw,
	Block,
	ArticleRaw,
	Article,
	ItemRaw,
	Item,
} from "./items/types";

export {
	slugs,
	items,
	map,
	mapByTag,
	itemsByTag,
	get,
	has,
	getMeta,
} from "./items";



export const label: string = "Projects";

export const title: string = "프로젝트 목록";

export const metadata: seo.MetadataOptions = {
	title: title,
};
