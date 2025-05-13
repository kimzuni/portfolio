import type { ProjectItem } from "../../pages/Project";



export const items: Array<[string, ProjectItem]> = Object.entries(
	import.meta.glob<true, string, { default: ProjectItem }>([
		"./*.tsx",
		"!**/index.tsx",
	], { eager: true })
).map(([path, module]) => [path.split("/").reverse()[0].split(".")[0], module.default]);
