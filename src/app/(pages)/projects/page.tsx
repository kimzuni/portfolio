import * as seo from "@/lib/seo";

import { Client, type ClientProps, type Item } from "./client";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.project.metadata);



const yearRange = contents.project.items.reduce<ClientProps["yearRange"]>((acc, cur) => {
	const [_start, _end] = cur.period;
	const start = _start.getFullYear();
	const end = _end?.getFullYear() ?? start;

	acc[0] = Math.min(acc[0], start);
	acc[1] = Math.max(acc[1], end);

	return acc;
}, [Infinity, 0]);



const tags = contents.project.tag.items.filter(x => x.projects.length).map<ClientProps["tags"][number]>(x => ({
	slug: x.slug,
	label: x.label,
}));



const skillGroups = contents.skill.category.items.map<ClientProps["skillGroups"][number]>(item => ({
	label: `${item.group.label} > ${item.label}`,
	items: item.skills.filter(skill => skill.projects.all.length).map(skill => ({
		slug: skill.slug,
		label: skill.label,
	})).sort((a, b) => a.label.localeCompare(b.label)),
}));



const items = contents.project.items.map<Item>(item => ({
	slug: item.slug,
	cover: item.cover,
	name: item.name,
	description: item.description.lines ?? [],
	period: [item.period[0], item.period[1]],
	tags: item.tags.map(tag => ({
		slug: tag.slug,
		label: tag.label,
	})),
	skills: {
		primary: item.skills.primary.map(skill => ({
			slug: skill.slug,
			label: skill.label,
		})),
		secondary: item.skills.secondary.map(skill => ({
			slug: skill.slug,
			label: skill.label,
		})),
	},
	isTeam: !!item.team,
}));



export default async function Projects() {
	const {
		label,
		title,
	} = contents.project;

	return (
		<Client
			label={label}
			title={title}
			yearRange={yearRange}
			tags={tags}
			skillGroups={skillGroups}
			items={items}
		/>
	);
}
