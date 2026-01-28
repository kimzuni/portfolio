import fs from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";



export interface Project {
	cover: StaticImageData;
	title: string;
	description: string;
}

export interface ProjectMeta extends Pick<Project, "cover" | "title"> {
	slug: string;
}

export interface ProjectContent extends Project, ProjectMeta {
}



const dirname = path.join(process.cwd(), "src", "contents", "projects");

export const projectMap: Record<string, ProjectContent> = await fs.promises
	.readdir(dirname, { withFileTypes: true })
	.then(arr => arr.filter(x => x.isDirectory()))
	.then(arr => Promise.all(arr.map(cur => (
		import(`@/contents/projects/${cur.name}`)
			.then(x => (!x.default ? null : [cur.name, { slug: cur.name, ...x.default } as ProjectContent] as const))
			.catch(() => null)
	))))
	.then(arr => arr.filter(x => x !== null))
	.then(arr => Object.fromEntries(arr))
	.catch(() => ({}));

export const slugs = Object.keys(projectMap);
export const projects = Object.values(projectMap);
export const projectsMeta = projects.map(x => ({
	slug: x.slug,
	cover: x.cover,
	title: x.title,
} satisfies ProjectMeta as ProjectMeta));
