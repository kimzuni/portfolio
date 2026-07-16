import * as seo from "@/lib/seo";
import type * as markdown from "@/lib/markdown";

import { FadeHeader } from "@/components/fade";
import { PageBadge } from "@/components/page-badge";
import { Heading } from "@/components/heading";

import { Client } from "./_components/client";
import { type FilterGroupItem, ResetButton } from "./_components/filter";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.project.metadata);



export interface ItemMetadata {
	slug: string;
	label: string;
	description?: markdown.Result;
}

const years = contents.project.items.reduce<[number, number]>((acc, cur) => {
	const [_start, _end] = cur.period;
	const start = _start.getFullYear();
	const end = _end?.getFullYear() ?? start;

	acc[0] = Math.min(acc[0], start);
	acc[1] = Math.max(acc[1], end);

	return acc;
}, [Infinity, 0]);

const tags: ItemMetadata[] = contents.project.tag.items.filter(
	x => contents.project.items.some(p => p.tags.some(t => t.slug === x.slug))
).map(x => ({
	slug: x.slug,
	label: x.label,
}));

const skills: FilterGroupItem[] = [];
for (const group of contents.skill.category.group.items) {
	const categories = contents.skill.category.items.filter(x => x.group.slug === group.slug);
	for (const category of categories) {
		const items = contents.skill.items.filter(skill => (
			skill.group.slug === category.group.slug
			&& skill.category.slug === category.slug
			&& contents.project.items.some(p => p.skills.some(s => s.slug === skill.slug))
		)).map(item => ({
			slug: item.slug,
			label: item.label,
			description: item.description,
		}) satisfies ItemMetadata).sort((a, b) => a.label.localeCompare(b.label));

		if (items.length) {
			skills.push({
				value: `${category.group.label} > ${category.label}`,
				items: items,
			});
		}
	}
}

const projects = contents.project.items;



export default async function Projects() {
	const {
		label,
		title,
	} = contents.project;

	return (
		<div className="space-y-12">
			<FadeHeader>
				<div className="flex items-center justify-between mb-0">
					<PageBadge
						className="mb-4"
						label={label}
					/>
					<ResetButton
						label="필터 초기화"
						variant="outline"
						size="lg"
						icon="RotateCcw"
						iconScale={1.2}
						iconRotate={-90}
						iconPosition="left"
					/>
				</div>

				<Heading>{title}</Heading>
			</FadeHeader>

			<Client
				years={years}
				tags={tags}
				skills={skills}
				projects={projects}
			/>
		</div>
	);
}
