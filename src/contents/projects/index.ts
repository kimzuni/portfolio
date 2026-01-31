import fs from "node:fs";
import path from "node:path";

import type { ProjectMeta, ProjectsPageData } from "@/app/projects/client";
import type { ProjectData } from "@/app/projects/[slug]/page";
import type { HomeProjectsData } from "@/app/_components/page/projects";



export type Tag = typeof tags[number];
export const tags = [
	"Frontend",
	"Backend",
	"DevOps",
	"Container",
	"Package",
	"Deployment",
] as const;



export interface ProjectContent extends Omit<
	& ProjectData
	& HomeProjectsData["items"][number],
	"slug"
> {}



const dirname = path.join(process.cwd(), "src", "contents", "projects");

export const projectMap: Record<string, ProjectData> = await fs.promises
	.readdir(dirname, { withFileTypes: true })
	.then(arr => arr.filter(x => x.isDirectory()))
	.then(arr => Promise.all(arr.map(cur => (
		import(`@/contents/projects/${cur.name}`)
			.then(x => (!x.default ? null : [cur.name, { slug: cur.name, ...x.default as ProjectContent }]))
			.catch(() => null)
	))))
	.then(arr => arr.filter(x => x !== null))
	.then(arr => Object.fromEntries(arr))
	.catch(() => ({}));

export const slugs = Object.keys(projectMap);
export const projects = Object.values(projectMap);
projects.sort((a, b) => {
	const [aStart, aEnd] = a.period;
	const [bStart, bEnd] = b.period;

	if (!aEnd && bEnd) return -1;
	if (aEnd && !bEnd) return 1;

	if (aEnd && bEnd) {
		return bEnd.getTime() - aEnd.getTime();
	}

	return bStart.getTime() - aStart.getTime();
});
export const projectsMeta = projects.map(x => ({
	slug: x.slug,
	cover: x.cover,
	title: x.title,
	description: x.description,
	period: x.period,
	tags: x.tags,
	skills: x.skills,
	team: x.team,
} satisfies ProjectMeta as ProjectMeta));



export const page: ProjectsPageData = {
	label: "Projects",
	heading: "프로젝트 목록",
	resetButton: {
		variant: "outline",
		label: "필터 초기화",
		size: "lg",
		icon: "RotateCcw",
		iconScale: 1.2,
		iconRotate: -90,
		iconPosition: "left",
	},
	projects,
};
