import fs from "fs/promises";
import path from "path";

import * as markdown from "@/lib/markdown";

import * as skill from "@/contents/skill";

import * as tag from "../tag";

import type { ItemRaw, Item } from "./types";



const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);

export const map: Record<string, Item> = await fs
	.readdir(dirname, { withFileTypes: true })
	.then(arr => arr.filter(x => x.isDirectory()))
	.then(arr => Promise.all(arr.map(cur => (
		import(`@/contents/project/items/${cur.name}`)
			.then(async (x: { item?: ItemRaw }) => (!x.item ? null : [cur.name, {
				...x.item,
				slug: cur.name,
				cover: typeof x.item.cover === "object" && "lightSrc" in x.item.cover ? x.item.cover : {
					lightSrc: x.item.cover,
					darkSrc: x.item.cover,
				},
				description: await markdown.render(x.item.description),
				tags: x.item.tags.map(x => tag.map[x]!),
				skills: x.item.skills.map(x => skill.map[x]!),
				team: x.item.team && {
					...x.item.team,
					description: await markdown.render(x.item.team.description),
					contributions: await markdown.renders(x.item.team.contributions, "description"),
				},
				articles: await Promise.all(x.item.articles.map(async s => ({
					...s,
					blocks: await markdown.renders(s.blocks, "text").then(arr => arr.map(b => ({
						...b,
						media: (
							!b.media || b.media.type !== "video" || typeof b.media.src !== "string" || b.media.src.startsWith("http") || b.media.src.startsWith("/") || b.media.src.startsWith(".")
							? b.media
							: {
								...b.media,
								src: `/media/${cur.name}/${b.media.src}`,
							}
						),
					}))),
				}))),
			} satisfies Item] as const))
			.catch(() => null)
	))))
	.then(arr => arr.filter(x => x !== null))
	.then(arr => Object.fromEntries(arr))
	.catch(() => ({}));



export const slugs = Object.keys(map);
export const items = Object.values(map)
items.sort((a, b) => {
	const [aStart, aEnd] = a.period;
	const [bStart, bEnd] = b.period;

	if (!aEnd && bEnd) return -1;
	if (aEnd && !bEnd) return 1;

	if (aEnd && bEnd) {
		return bEnd.getTime() - aEnd.getTime();
	}

	return bStart.getTime() - aStart.getTime();
});



export const mapByTag = items.reduce((acc, cur) => {
	for (const tag of cur.tags) {
		(acc[tag.slug] ??= []).push(cur);
	}
	return acc;
}, {} as Record<string, Item[]>);

export const itemsByTag = Object.entries(mapByTag).map(([tag, projects]) => ({
	tag,
	projects,
}));



export const get = (slug: string) => {
	slug = decodeURIComponent(slug);
	return map[slug];
}

export const has = (slug: string) => {
	slug = decodeURIComponent(slug);
	return slug in map;
}



export const getMeta = (x: Item) => ({
	slug: x.slug,
	cover: x.cover,
	title: x.title,
	description: x.description,
	period: x.period,
	tags: x.tags,
	skills: x.skills,
	team: x.team,
});
