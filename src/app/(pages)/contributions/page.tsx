import * as seo from "@/lib/seo";

import { Client, type ClientProps, type Item } from "./client";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.contribution.metadata);



const repositoryGroups = contents.contribution.git.provider.items.reduce<ClientProps["repositoryGroups"]>((acc, cur) => {
	for (const owner of cur.owners) {
		const ownerLabel = `[${cur.label}] ${owner.slug}`;
		const item = {
			label: ownerLabel,
			items: [] as typeof acc[number]["items"],
		};
		for (const repo of owner.repositories) {
			item.items.push({
				provider: cur.slug,
				owner: owner.slug,
				slug: repo.slug,
				label: repo.slug,
			});
		}
		acc.push(item);
	}
	return acc;
}, []);



const skillGroups = contents.skill.category.items.map<ClientProps["skillGroups"][number]>(item => ({
	label: `${item.group.label} > ${item.label}`,
	items: item.skills.filter(skill => skill.contributions.all.length).map(skill => ({
		slug: skill.slug,
		label: skill.label,
	})).sort((a, b) => a.label.localeCompare(b.label)),
}));



const items = contents.contribution.items.map<Item>(item => ({
	url: item.repository.url,
	scope: item.repository.scope,
	provider: item.provider.label,
	owner: item.owner.slug,
	repository: item.repository.slug,
	status: {
		label: `${item.type.short}/${item.status.label}`,
		color: item.status.color,
		icon: item.status.icon,
	},
	date: item.date,
	numbers: item.numbers.map(x => ({
		url: x.url,
		value: x.value,
		status: {
			slug: x.status.slug,
			icon: x.status.icon,
			color: x.status.color,
		},
		colors: x.labels.map(x => x.color),
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
	description: item.description.result,
}));



const statusInfoMap: ClientProps["statusInfoMap"] = new Map(contents.contribution.type.status.items.map(x => [x.slug, {
	icon: x.icon,
	label: `${x.type.short}/${x.label}`,
	color: x.color,
}]));

const colorLabel: ClientProps["colorLabel"] = new Map(contents.contribution.itemLabel.items.map(x => [x.color, x.label]));



export default async function Contributions() {
	const {
		label,
		title,
	} = contents.contribution;

	return (
		<Client
			label={label}
			title={title}
			items={items}
			repositoryGroups={repositoryGroups}
			skillGroups={skillGroups}
			statusInfoMap={statusInfoMap}
			colorLabel={colorLabel}
		/>
	);
}
