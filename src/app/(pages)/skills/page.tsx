import * as seo from "@/lib/seo";

import { Client, type ClientProps, type Item } from "./client";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.skill.metadata);



const levels = contents.skill.level.items.map(x => x.slug);
const level = {
	min: Math.min(...levels),
	max: Math.max(...levels),
	step: levels.length > 1 ? levels[1]! - levels[0]! : 1,
};



const categoryGroups = contents.skill.category.group.items.map<ClientProps["categoryGroups"][number]>(group => ({
	slug: group.slug,
	label: group.label,
	items: group.categories.map<ClientProps["categoryGroups"][number]["items"][number]>(category => ({
		slug: category.slug,
		label: category.label,
	})),
})).filter(x => x.items.length);



const items = contents.skill.items.map<Item>(skill => ({
	slug: skill.slug,
	group: skill.group.label,
	category: skill.category.label,
	icon: skill.icon,
	iconProvider: skill.provider,
	label: skill.label,
	level: {
		slug: skill.level.slug,
		label: skill.level.label,
		color: skill.level.color,
	},
	projects: skill.projects.all.length,
	contributions: skill.contributions.all.length,
})).sort((a, b) => (
	b.level.slug - a.level.slug
));



export default async function Skills() {
	const {
		label,
		title,
	} = contents.skill;

	return (
		<Client
			label={label}
			title={title}
			level={level}
			categoryGroups={categoryGroups}
			items={items}
		/>
	);
}
