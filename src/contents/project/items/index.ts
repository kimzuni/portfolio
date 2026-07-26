import * as array from "@/lib/array";
import * as markdown from "@/lib/markdown";

import * as skill from "@/contents/skill";

import * as tag from "../tag";

import type { ItemRaw, Item } from "./types";



const importSlugs = [
	"inst@gram",
	"longvinter-docker-server",
	"generative-agents",
	"templify",
	"yamllint-js",
	"web-portfolio",
] as const;

const promises = importSlugs.map(async slug => (
	import(`./${slug}`)
		.then<ItemRaw>(x => x.item)
		.then<[string, Item]>(async item => [slug, {
			...item,
			slug: slug,
			cover: !item.cover ? null : typeof item.cover === "object" && "lightSrc" in item.cover ? item.cover : {
				lightSrc: item.cover,
				darkSrc: item.cover,
			},
			tags: item.tags.map(x => tag.map.get(x)!),
			skills: {
				all: (array.is(item.skills) ? item.skills : [...(item.skills.primary ?? []), ...(item.skills.secondary ?? [])]).map(x => skill.map[x]!),
				primary: (array.is(item.skills) ? item.skills : (item.skills.primary ?? [])).map(x => skill.map[x]!),
				secondary: (array.is(item.skills) ? [] : (item.skills.secondary ?? [])).map(x => skill.map[x]!),
			},
			team: item.team && {
				...item.team,
				description: await markdown.render(item.team.description),
				contributions: await Promise.all(item.team.contributions.map(async contribution => ({
					...contribution,
					description: await markdown.render(contribution.description?.map(x => `- ${x}`).join("\n")),
				}))),
			},
			description: await markdown.render(item.description),
			highlights: await markdown.render((item.highlights ?? []).map(highlight => `- **${highlight.label}**: ${highlight.value}`).join("\n")),
			articles: await Promise.all(item.articles.map(async article => ({
				...article,
				blocks: await markdown.renders(article.blocks, "text").then(arr => arr.map(block => ({
					...block,
					media: (
						!block.media || block.media.type !== "video" || typeof block.media.src !== "string" || block.media.src.startsWith("http") || block.media.src.startsWith("/") || block.media.src.startsWith(".")
						? block.media
						: {
							...block.media,
							src: `/media/${slug}/${block.media.src}`,
						}
					),
				}))),
			}))),
		}])
		.catch(() => null)
));

export const map: Map<string, Item> = await Promise.all(promises)
	.then(arr => arr.filter(x => x !== null))
	.then(arr => new Map(arr))
	.catch(() => new Map());



export const slugs = map.keys().toArray();
export const items = map.values().toArray().sort((a, b) => {
	const [aStart, aEnd] = a.period;
	const [bStart, bEnd] = b.period;

	if (!aEnd && bEnd) return -1;
	if (aEnd && !bEnd) return 1;

	if (aEnd && bEnd) {
		return bEnd.getTime() - aEnd.getTime();
	}

	return bStart.getTime() - aStart.getTime();
});

// 역참조 구성
for (const item of items) {
	for (const skill of item.skills.primary) {
		skill.projects.all.push(item);
		skill.projects.primary.push(item);
	}
	for (const skill of item.skills.secondary) {
		skill.projects.all.push(item);
		skill.projects.secondary.push(item);
	}
	for (const tag of item.tags) {
		tag.projects.push(item);
	}
}
