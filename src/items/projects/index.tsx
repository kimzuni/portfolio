import type { ProjectProps } from "../../pages/Project";



export type Item = ProjectProps;

export const items: Array<[string, Item]> = Object.entries(
	import.meta.glob<true, string, { default: Item }>([
		"./*.tsx",
		"!**/index.tsx",
	], { eager: true })
).map(([path, module]) => [path.split("/").reverse()[0].split(".")[0], module.default]);
