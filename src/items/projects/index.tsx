import type { ProjectItem } from "../../pages/Home/Projects";
import type { ProjectProps } from "../../pages/Project";
import type { ProjectsProps } from "../../pages/Projects";

import deploy from "./deploy";



export type Item = ProjectProps & ProjectItem & ProjectsProps;

export const items = (
	Object.entries(
		import.meta.glob<true, string, { default: Item }>([
			"./**/*.tsx",
		], { eager: true })
	)
	.map(([path, module]) => [path.slice(2).split(".tsx")[0].replace("/index", ""), module.default])
	.filter(x => deploy.includes(x[0] as string)) as Array<[string, Item]>
);

const sortedByDate = items.sort((a, b) => [...b[1].date].reverse()[0].getTime() - [...a[1].date].reverse()[0].getTime());

const sortedByDeploy: Array<[string, Item]> = [];
for (const item of deploy) {
	const find = items.find(x => x[0] === item);
	if (!find) continue;
	sortedByDeploy.push(find);
}

export const sortedBy = {
	deploy: sortedByDeploy,
	date: sortedByDate,
};



const projects = sortedBy.deploy;
export default projects;
