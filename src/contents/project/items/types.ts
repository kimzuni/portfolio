import type { StaticImageData } from "next/image";

import type { Period } from "@/components/period-box";
import type { ShieldProps } from "@/components/shield";
import type { LinkBadgeProps } from "@/components/link-badge";
import type { GenerateImageThemedMap, MediaProps } from "@/components/media";
import type * as markdown from "@/lib/markdown";

import type * as contents from "@/contents";

import type * as tag from "../tag";



export interface ContributionRaw {
	label: string;
	percentage: number;
	description: markdown.Source;
}

export interface Contribution extends Omit<ContributionRaw, "description"> {
	description: markdown.Result<ContributionRaw["description"]>;
}



export interface TeamRaw {
	size: number;
	isAtLeast?: boolean;
	description?: markdown.Source;
	contributions: ContributionRaw[];
}

export interface Team extends Omit<TeamRaw, "description" | "contributions"> {
	description: markdown.Result<TeamRaw["description"]>;
	contributions: Contribution[];
}



export interface BlockRaw {
	colSpan?: number;
	text?: markdown.Source;
	media?: MediaProps;
}

export interface Block extends Omit<BlockRaw, "text"> {
	text: markdown.Result<BlockRaw["text"]>;
}



export interface ArticleRaw {
	blocks: BlockRaw[];
}

export interface Article extends Omit<ArticleRaw, "blocks"> {
	blocks: Block[];
}



export interface ItemRaw {
	pin?: boolean;
	isOngoing?: boolean;
	cover: StaticImageData | GenerateImageThemedMap<StaticImageData>;
	title: string;
	description: markdown.Source;
	period: Period;
	tags: tag.Slug[];
	skills: contents.skill.Slug[];
	team?: TeamRaw;
	shields?: ShieldProps[];
	badges?: LinkBadgeProps[];
	articles: ArticleRaw[];
}

export interface Item extends Omit<ItemRaw, "cover"| "description" | "tags" | "skills" | "team" | "articles"> {
	slug: string;
	cover: GenerateImageThemedMap<StaticImageData>;
	description: markdown.Result<ItemRaw["description"]>;
	tags: tag.Item[];
	skills: contents.skill.Item[];
	team?: Team;
	articles: Article[];
}
