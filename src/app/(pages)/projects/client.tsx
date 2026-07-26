"use client";

import { cn } from "@/lib/utils";
import { useSearchParamRouter } from "@/hooks/use-search-param-router";

import type {
	FilterSlugItem,
	FilterSlugGroupItem,
} from "@/components/filter/types";
import {
	FilterHeader,
	FilterSection,
	TabsBox,
	type TabsItem,
	SliderBox,
	ComboboxBox,
	type ComboboxItem,
	ViewOptionsResetButton,
} from "@/components/filter";
import {
	InfiniteScroll,
	PresetActionView,
	PresetActionSortBy,
	PresetActionReverse,
} from "@/components/list-view";
import {
	ProjectBox,
	type ProjectBoxItem,
	type ProjectBoxBadgeItem,
} from "@/components/project-box";



const FILTER_KEY_MAP = {
	TYPE: "type",
	YEAR_FROM: "year-from",
	YEAR_TO: "year-to",
	TAG: "tag",
	MATCH_ALL_TAGS: "match-all-tags",
	SKILL: "skill",
	MATCH_ALL_SKILLS: "match-all-skills",
} as const;

const VIEW_KEY_MAP = {
	VIEW_PERIOD: "view-period",
	VIEW_COVER: "view-cover",
	VIEW_DESCRIPTION: "view-description",
	VIEW_TAGS: "view-tags",
	VIEW_PRIMARY_SKILLS: "view-primary-skills",
	VIEW_SECONDARY_SKILLS: "view-secondary-skills",
	VIEW_AVG_CONTRIBUTION: "view-avg-contribution",
	REVERSE: "reverse",
} as const;

const filterKeys = Object.values(FILTER_KEY_MAP);
const viewKeys = Object.values(VIEW_KEY_MAP);
const PARAM_KEY_MAP = {
	...FILTER_KEY_MAP,
	...VIEW_KEY_MAP,
} as const;



const types: FilterSlugItem<TabsItem>[] = [
	{
		slug: null,
		label: "All",
	},
	{
		slug: "personal",
		label: "Personal",
	},
	{
		slug: "team",
		label: "Team",
	},
];
const typeMap = new Map(types.map(x => [x.slug, x]));



export interface Item extends Omit<Required<ProjectBoxItem>, "skills"> {
	skills: Record<"primary" | "secondary", ProjectBoxBadgeItem[]>;
}

export interface ClientProps {
	label: string;
	title: string;
	yearRange: [number, number];
	tags: FilterSlugItem<ComboboxItem>[];
	skillGroups: FilterSlugGroupItem<ComboboxItem>[];
	items: Item[];
}

export function Client({
	label,
	title,
	yearRange,
	tags,
	skillGroups,
	items,
}: ClientProps) {
	const { searchParams, updateParams } = useSearchParamRouter({
		engine: "native",
		mode: "replace",
	});

	const isReverse = searchParams.get(PARAM_KEY_MAP.REVERSE) === "true";



	const _type = searchParams.get(PARAM_KEY_MAP.TYPE);
	const currType = typeMap.get(_type) ?? typeMap.get(null)!;

	const getYear = (slug: number) => Math.max(yearRange[0], Math.min(yearRange[1], slug));
	const _yearFrom = Number(searchParams.get(PARAM_KEY_MAP.YEAR_FROM)) || yearRange[0];
	const _yearTo = Number(searchParams.get(PARAM_KEY_MAP.YEAR_TO)) || yearRange[1];
	const currYears: [number, number] = [getYear(_yearFrom), getYear(_yearTo)];

	const tagMap = new Map(tags.map(x => [x.slug, x]));
	const _tags = searchParams.getAll(PARAM_KEY_MAP.TAG);
	const currTags = _tags.map(x => tagMap.get(x)).filter(x => x !== undefined);
	const currMatchAllTags = searchParams.get(PARAM_KEY_MAP.MATCH_ALL_TAGS) === "true";

	const skills = skillGroups.map(x => x.items).flat();
	const skillMap = new Map(skills.map(x => [x.slug, x]));
	const _skills = searchParams.getAll(PARAM_KEY_MAP.SKILL);
	const currSkills = _skills.map(x => skillMap.get(x)).filter(x => x !== undefined);
	const currMatchAllSkills = searchParams.get(PARAM_KEY_MAP.MATCH_ALL_SKILLS) === "true";

	const currViewPeriod = searchParams.get(PARAM_KEY_MAP.VIEW_PERIOD) !== "false";
	const currViewCover = searchParams.get(PARAM_KEY_MAP.VIEW_COVER) !== "false";
	const currViewDescription = searchParams.get(PARAM_KEY_MAP.VIEW_DESCRIPTION) !== "false";
	const currViewTags = searchParams.get(PARAM_KEY_MAP.VIEW_TAGS) !== "false";
	const currViewPrimarySkills = searchParams.get(PARAM_KEY_MAP.VIEW_PRIMARY_SKILLS) !== "false";
	const currViewSecondarySkills = searchParams.get(PARAM_KEY_MAP.VIEW_SECONDARY_SKILLS) === "true";



	const tagFilterKey = currMatchAllTags ? "every" : "some";
	const skillFilterKey = currMatchAllSkills ? "every" : "some";
	const filteredItems = items.filter(item => {
		const teamMatch = (
			currType.slug === null
			|| (currType.slug === "team" && item.isTeam)
			|| (currType.slug === "personal" && !item.isTeam)
		);

		const startYear = item.period[0].getFullYear();
		const endYear = (item.period[1] ?? new Date()).getFullYear();
		const yearMatch = !(currYears[0] > endYear || currYears[1] < startYear);

		const tagMatch = !currTags.length ? true : currTags[tagFilterKey](tag => item.tags.find(x => x.slug === tag.slug));
		const skillMatch = !currSkills.length ? true : currSkills[skillFilterKey](skill => 
			item.skills.primary.find(x => x.slug === skill.slug)
			|| item.skills.secondary.find(x => x.slug === skill.slug)
		);

		return teamMatch && yearMatch && tagMatch && skillMatch;
	});

	const sortedItems = filteredItems.sort((_a, _b) => {
		const [a, b] = isReverse ? [_b, _a] : [_a, _b];

		const aEnd = a.period[1]?.getTime();
		const bEnd = b.period[1]?.getTime();
		if (aEnd && !bEnd) return 1;
		if (!aEnd && bEnd) return -1;

		const endDiff = (bEnd ?? 0) - (aEnd ?? 0);
		if (endDiff !== 0) return endDiff;

		const aStart = a.period[0].getTime();
		const bStart = b.period[0].getTime();
		return bStart - aStart;
	});



	const handleYearCommitted = (slug: [number, number]) => {
		updateParams({
			[PARAM_KEY_MAP.YEAR_FROM]: slug[0] === yearRange[0] ? null : slug[0].toString(),
			[PARAM_KEY_MAP.YEAR_TO]: slug[1] === yearRange[1] ? null : slug[1].toString(),
		});
	};

	const handleValueChange = <T extends boolean | string | string[] | null>(
		key: string,
		value: T,
		defaultValue?: T,
	) => {
		const isDefault = defaultValue !== undefined && value?.toString() === defaultValue?.toString();
		updateParams({
			[key]: isDefault ? null : value,
		});
	};



	return (
		<div className="space-y-12">
			<FilterHeader
				label={label}
				resetButtonProps={{
					resetKeys: filterKeys,
				}}
			>{title}</FilterHeader>

			<FilterSection>
				<TabsBox
					className="pb-2"
					variant="line"
					items={types}
					value={currType}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.TYPE, value.slug)}
				/>

				<SliderBox
					label="Years"
					min={yearRange[0]}
					max={yearRange[1]}
					value={currYears}
					onValueCommitted={handleYearCommitted}
				/>

				<ComboboxBox
					multiple
					label="Tags"
					items={tags}
					value={currTags}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.TAG, value.map(x => x.slug))}
					isItemEqualToValue={(a, b) => a.slug === b.slug}
					switchProps={{
						label: "Match all",
						checked: currMatchAllTags,
						onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.MATCH_ALL_TAGS, checked, false),
					}}
				/>

				<ComboboxBox
					multiple
					label="Skills"
					items={skillGroups}
					value={currSkills}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.SKILL, value.map(x => x.slug))}
					isItemEqualToValue={(a, b) => a.slug === b.slug}
					switchProps={{
						label: "Match all",
						checked: currMatchAllSkills,
						onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.MATCH_ALL_SKILLS, checked, false),
					}}
				/>
			</FilterSection>

			<InfiniteScroll
				className={cn(
					"grid justify-center-safe gap-6",
					"grid-cols-[repeat(auto-fill,minmax(0,300px))]",
				)}
				resetButtonProps={{
					resetKeys: filterKeys,
				}}
				total={items.length}
				items={sortedItems}
				renderItem={({
					period,
					cover,
					description,
					tags,
					skills,
					isTeam,
					...item
				}) => (
					<ProjectBox
						key={item.slug}
						period={currViewPeriod ? period : undefined}
						cover={currViewCover ? cover : undefined}
						description={currViewDescription ? description : undefined}
						tags={currViewTags ? tags : []}
						skills={[
							...(currViewPrimarySkills ? skills.primary : []),
							...(currViewSecondarySkills ? skills.secondary : []),
						]}
						isTeam={isTeam}
						activeTags={currTags}
						activeSkills={currSkills}
						{...item}
					/>
				)}
			>
				<PresetActionView
					items={[
						{
							label: "Period",
							checked: currViewPeriod,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_PERIOD, checked, true),
						},
						{
							label: "Name",
							checked: true,
							disabled: true,
						},
						{
							label: "Cover",
							checked: currViewCover,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_COVER, checked, true),
						},
						{
							label: "Description",
							checked: currViewDescription,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_DESCRIPTION, checked, true),
						},
						{
							label: "Tags",
							checked: currViewTags,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_TAGS, checked, true),
						},
						{
							label: "Primary Skills",
							checked: currViewPrimarySkills,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_PRIMARY_SKILLS, checked, true),
						},
						{
							label: "Secondary Skills",
							checked: currViewSecondarySkills,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_SECONDARY_SKILLS, checked, false),
						},
					]}
				/>

				<PresetActionSortBy
					label="Latest"
					items={[]}
					disabled
				/>

				<PresetActionReverse
					reverse={isReverse}
					onReverseChange={(reverse) => handleValueChange(PARAM_KEY_MAP.REVERSE, reverse, false)}
				/>
				
				<ViewOptionsResetButton
					resetKeys={viewKeys}
				/>
			</InfiniteScroll>
		</div>
	);
}
