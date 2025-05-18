import type { ProjectItem } from "../../pages/Home/Projects";
import type { ProjectProps } from "../../pages/Project";
import type { ProjectsProps } from "../../pages/Projects";



export type Item = ProjectProps & ProjectItem & ProjectsProps;

export const items: Array<[string, Item]> = Object.entries(
	import.meta.glob<true, string, { default: Item }>([
		"./**/*.tsx",
	], { eager: true })
).map(([path, module]) => [path.slice(2).split(".tsx")[0].replace("/index", ""), module.default]);
