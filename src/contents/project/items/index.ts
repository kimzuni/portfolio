import * as markdown from "@/lib/markdown";

import * as skill from "@/contents/skill";

import * as tag from "../tag";

import type { ItemRaw, Item } from "./types";



const importSlugs = [
	"bun-elysiajs-drizzle-orm-restful-api",
	"generative-agents",
	"inst@gram",
	"longvinter-docker-server",
	"templify",
	"web-portfolio",
	"yamllint-js",
] as const;

const promises = importSlugs.map(async slug => (
	import(`./${slug}`)
		.then(x => x.item as ItemRaw)
		.then(async item => [slug, {
			...item,
			slug: slug,
			cover: typeof item.cover === "object" && "lightSrc" in item.cover ? item.cover : {
				lightSrc: item.cover,
				darkSrc: item.cover,
			},
			description: await markdown.render(item.description),
			tags: item.tags.map(x => tag.map[x]!),
			skills: item.skills.map(x => skill.map[x]!),
			team: item.team && {
				...item.team,
				description: await markdown.render(item.team.description),
				contributions: await markdown.renders(item.team.contributions, "description"),
			},
			articles: await Promise.all(item.articles.map(async s => ({
				...s,
				blocks: await markdown.renders(s.blocks, "text").then(arr => arr.map(b => ({
					...b,
					media: (
						!b.media || b.media.type !== "video" || typeof b.media.src !== "string" || b.media.src.startsWith("http") || b.media.src.startsWith("/") || b.media.src.startsWith(".")
						? b.media
						: {
							...b.media,
							src: `/media/${slug}/${b.media.src}`,
						}
					),
				}))),
			}))),
		} satisfies Item] as const)
		.catch(() => null)
));

export const map: Record<string, Item> = await Promise.all(promises)
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
