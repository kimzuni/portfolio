import type * as markdown from "@/lib/markdown";

import type * as skill from "@/contents/skill";

import type * as git from "./git";
import type * as label from "./label";
import type * as type from "./type";



export interface NumberObjectRaw {
	status?: type.status.Slug;
	value: number | number[];

	/**
	 * @default "bug"
	 */
	labels?: label.Slug | label.Slug[];
}

export interface NumberObject {
	url: string;
	type: type.Item;
	status: type.status.Item;
	labels: label.Item[];
	value: number;
}



export interface ItemRaw<
	P extends git.provider.Slug = git.provider.Slug,
	O extends git.owner.Slug<P> = git.owner.Slug<P>,
> extends Omit<NumberObjectRaw, "value"> {
	pin?: boolean;
	provider: P;
	owner: O;
	repository: git.repository.Slug<P, O>;
	date: Date;
	numbers: number | NumberObjectRaw | Array<number | NumberObjectRaw>;
	skills: skill.Slug[] | Record<"primary" | "secondary", skill.Slug[]>;
	description: markdown.Source;
	status: type.status.Slug;
}



export interface Item extends Omit<ItemRaw<git.provider.Slug, git.owner.Slug>, "provider" | "owner" | "repository" | "labels" | "skills" | "description" | "numbers" | "status"> {
	provider: git.provider.Item;
	owner: git.owner.Item;
	repository: git.repository.Item;
	skills: Record<"all" | "primary" | "secondary", skill.Item[]>;
	description: markdown.Result;
	type: type.Item;
	status: type.status.Item;
	numbers: NumberObject[];
	prNumbers: Record<"all" | "open" | "merged" | "closed", NumberObject[]>;
	issueNumbers: Record<"all" | "open" | "closed", NumberObject[]>;
};
