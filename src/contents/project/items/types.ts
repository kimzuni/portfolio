import type { StaticImageData } from "next/image";

import type { Period } from "@/components/period-box";
import type { ShieldProps } from "@/components/shield";
import type { GenerateImageThemedMap, MediaProps } from "@/components/media";
import type * as markdown from "@/lib/markdown";

import type * as contents from "@/contents";

import type * as tag from "../tag";



export interface HighlightRaw {
	label: string;
	value: string;
}

export type Highlights = markdown.Result;



export interface BlockRaw {
	colSpan?: number;
	text?: markdown.Source;
	media?: MediaProps;
}

export interface Block extends Omit<BlockRaw, "text"> {
	text: markdown.Result;
}



export interface LinkRaw {
	label: string;
	href: string;
}

export interface Link extends LinkRaw {
}



export interface ArticleRaw {
	tab?: string;
	linkedToPrevious?: boolean;
	maxWidth?: number | string;
	blocks: BlockRaw[];
}

export interface Article extends Omit<ArticleRaw, "blocks"> {
	blocks: Block[];
}



export interface ItemRaw {
	pin?: boolean;
	isOngoing?: boolean;
	cover?: StaticImageData | GenerateImageThemedMap<StaticImageData> | null;
	name: string;
	description: markdown.Source;
	highlights?: HighlightRaw[];
	period: Period<Date>;
	shields?: ShieldProps[];
	links?: LinkRaw[];
	tags: tag.Slug[];
	skills: contents.skill.Slug[] | Partial<Record<"primary" | "secondary", contents.skill.Slug[]>>;
	team?: number;
	articles: ArticleRaw[];
}

export interface Item extends Omit<ItemRaw, "cover" | "description" | "highlights" | "list" | "tags" | "skills" | "articles"> {
	slug: string;
	cover: GenerateImageThemedMap<StaticImageData> | null;
	description: markdown.Result;
	highlights: Highlights;
	tags: tag.Item[];
	skills: Record<"all" | "primary" | "secondary", contents.skill.Item[]>;
	articles: Article[];
}
