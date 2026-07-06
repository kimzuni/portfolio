import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";
import type * as markdown from "@/lib/markdown";

import { PageBadge } from "@/components/page-badge";
import { Heading } from "@/components/heading";

import type { FilterGroupItem } from "./_components/filter";
import { ResetButton, Slider, ComboboxMultiple } from "./_components/filter";
import { ProjectGrid } from "./_components/project-grid";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.project.metadata);



export interface FilterItem {
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

const tags: FilterItem[] = contents.project.tag.items.filter(
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
		}) satisfies FilterItem).sort((a, b) => a.label.localeCompare(b.label));

		if (items.length) {
			skills.push({
				value: `${category.group.label} > ${category.label}`,
				items: items,
			});
		}
	}
}

const flattenedSkills = skills.map(x => x.items).flat();

const projects = contents.project.items;



type FilterKey = typeof filterKeys[number];
const filterKeys = [
	"years",
	"tags",
	"skills",

	"match-all-tags",
	"match-all-skills",
] as const;

interface FilterTabsProps {
	years: {
		key: string;
		range: [number, number];
		value: [number, number];
	};
	tags: {
		key: string;
		items: Array<FilterGroupItem | FilterItem>;
		value: FilterItem[];
		matchAll: {
			key: string;
			checked: boolean;
		};
	};
	skills: {
		key: string;
		items: Array<FilterGroupItem | FilterItem>;
		value: FilterItem[];
		matchAll: {
			key: string;
			checked: boolean;
		};
	};
}

function FilterTabs({
	years,
	tags,
	skills,
}: FilterTabsProps) {
	return (
		<div className="space-y-6 *:space-y-3 *:w-full *:max-w-md">
			<div>
				<Slider
					label="Years"
					min={years.range[0]}
					max={years.range[1]}
					value={years.value}
					searchParamKey={years.key}
				/>
			</div>

			<div>
				<ComboboxMultiple
					label="Tags"
					searchParamKey={tags.key}
					items={tags.items}
					value={tags.value.map(x => x.label)}
					switchProps={{
						label: "Match all",
						searchParamKey: tags.matchAll.key,
						checked: tags.matchAll.checked,
					}}
				/>
			</div>

			<div>
				<ComboboxMultiple
					label="Skills"
					searchParamKey={skills.key}
					items={skills.items}
					value={skills.value.map(x => x.label)}
					switchProps={{
						label: "Match all",
						searchParamKey: skills.matchAll.key,
						checked: skills.matchAll.checked,
					}}
				/>
			</div>
		</div>
	);
}



export type Props = PageProps<"/projects">;



export default async function Projects({
	searchParams,
}: Props) {
	const {
		label,
		title,
	} = contents.project;

	const search: Partial<Record<FilterKey, string[]>> = {};

	const searchParamsJson = await searchParams;
	for (const key of filterKeys) {
		const value = searchParamsJson[key];
		const arr = Array.isArray(value) ? value : value ? value.split(",") : [];
		search[key] = arr.length ? arr : undefined;
	}

	const toYearTuple = (value?: string[]): [number, number] => {
		const numbers = value?.map(x => Number(x) || undefined).filter(x => x !== undefined) ?? [];
		return [numbers[0] ?? years[0], numbers[1] ?? years[1]];
	};

	const selected = {
		years: toYearTuple(search.years),
		tags: (search.tags ?? []).map(slug => tags.find(x => x.slug === slug)).filter(x => x !== undefined),
		skills: (search.skills ?? []).map(slug => flattenedSkills.find(x => x.slug === slug)).filter(x => x !== undefined),
	};

	const checked = {
		matchAllTags: search["match-all-tags"]?.[0] === "true",
		matchAllSkills: search["match-all-skills"]?.[0] === "true",
	};

	const tagFilterKey = checked.matchAllTags ? "every" : "some";
	const skillFilterKey = checked.matchAllSkills ? "every" : "some";
	const filteredProjects = projects.filter((project) => {
		const startYear = project.period[0].getFullYear();
		const endYear = (project.period[1] ?? new Date()).getFullYear();
		const yearMatch = !(selected.years[0] > endYear || selected.years[1] < startYear);

		const tagMatch = !selected.tags.length ? true : selected.tags[tagFilterKey](tag => project.tags.find(x => x.slug === tag.slug));
		const skillMatch = !selected.skills.length ? true : selected.skills[skillFilterKey](skill => project.skills.find(x => x.slug === skill.slug));
		return yearMatch && tagMatch && skillMatch;
	});

	return (
		<div className="page-content space-y-12">
			<section>
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
			</section>

			<section>
				<FilterTabs
					years={{
						key: "years",
						range: years,
						value: selected.years,
					}}
					tags={{
						key: "tags",
						items: tags,
						value: selected.tags,
						matchAll: {
							key: "match-all-tags",
							checked: checked.matchAllTags,
						},
					}}
					skills={{
						key: "skills",
						items: skills,
						value: selected.skills,
						matchAll: {
							key: "match-all-skills",
							checked: checked.matchAllSkills,
						},
					}}
				/>
			</section>

			<section
				className={cn(
					"container pt-0 grid gap-6",
					"grid-cols-[repeat(auto-fill,minmax(0,300px))] justify-center",
					!filteredProjects.length && "block",
				)}
			>
					<ProjectGrid
						key={filteredProjects.map(x => x.slug).toString()}
						projects={filteredProjects}
						activeTags={selected.tags}
						activeSkills={selected.skills}
					/>
					{
						filteredProjects.length
							? undefined
							: (
								<p className="text-center">
									{
										projects.length
										? "아직 진행한 프로젝트가 없어요 :("
										: <>
											선택한 필터 조건에 맞는 프로젝트가 없어요!
											<br/>
											필터를
											<ResetButton
												label="초기화"
												variant="ghost"
												size="default"
												className="inline p-0 mx-1 text-primary hover:text-primary hover:underline hover:bg-transparent!"
											/>
											하거나 다른 조합을 선택해 보세요 :)
										</>
									}
								</p>
							)
					}
			</section>
		</div>
	);
}
