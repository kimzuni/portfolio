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
	SliderBox,
	SwitchBox,
	ComboboxBox,
	type ComboboxItem,
	ViewOptionsResetButton,
} from "@/components/filter";
import {
	InfiniteScroll,
	type InfiniteGroupItem,
	type DropdownMenuItem,
	ActionRadioMenu,
	PresetActionView,
	PresetActionMultipleSortBy,
	PresetActionReverse,
} from "@/components/list-view";
import {
	SkillBox,
	type SkillBoxItem,
} from "@/components/skill-box";



const FILTER_KEY_MAP = {
	TYPE: "type",
	LEVEL_FROM: "level-from",
	LEVEL_TO: "level-to",
	CATEGORY: "category",
	HAS_PROJECT: "has-project",
	HAS_CONTRIBUTION: "has-contribution",
} as const;

const VIEW_KEY_MAP = {
	GROUP_BY: "group-by",
	SORT_BY: "sort-by",
	VIEW_ICON: "view-icon",
	VIEW_LEVEL: "view-level",
	VIEW_CATEGORY_GROUP: "view-category-group",
	VIEW_CATEGORY: "view-category",
	VIEW_PROJECT_COUNT: "view-project-count",
	VIEW_CONTRIBUTION_COUNT: "view-contribution-count",
	REVERSE: "reverse",
} as const;

const filterKeys = Object.values(FILTER_KEY_MAP);
const viewKeys = Object.values(VIEW_KEY_MAP);
const PARAM_KEY_MAP = {
	...FILTER_KEY_MAP,
	...VIEW_KEY_MAP,
} as const;



const sortByOptions: FilterSlugItem<DropdownMenuItem<string>>[] = [
	{
		slug: "project-count",
		label: "Project Count",
	},
	{
		slug: "contribution-count",
		label: "Contribution Count",
	},
];
const sortByOptionMap = new Map(sortByOptions.map(x => [x.slug, x]));



const groupByOptions: FilterSlugGroupItem<DropdownMenuItem>[] = [
	{
		label: "Group by",
		items: [],
	},
	{
		label: "",
		items: [
			{
				slug: null,
				label: "None",
			},
			{
				slug: "a-z",
				label: "A-Z",
			},
			{
				slug: "level",
				label: "Level",
			},
			{
				slug: "category-group",
				label: "Category Group",
			},
			{
				slug: "category",
				label: "Category",
			},
		],
	},
];
const groupByOptionMap = new Map(groupByOptions.map(x => x.items).flat().map(x => [x.slug, x]));



export interface Item extends Omit<Required<SkillBoxItem>, "level" | "icon" | "iconProvider"> {
	level: SkillBoxItem["level"] & { slug: number };
	iconProvider?: SkillBoxItem["iconProvider"];
	icon?: SkillBoxItem["icon"];
}

export interface ClientProps {
	label: string;
	title: string;
	level: {
		min: number;
		max: number;
		step: number;
	};
	categoryGroups: FilterSlugGroupItem<ComboboxItem>[];
	items: Item[];
}

export function Client({
	label,
	title,
	level,
	categoryGroups,
	items,
}: ClientProps) {
	const { searchParams, updateParams } = useSearchParamRouter({
		engine: "native",
		mode: "replace",
	});

	const _sortBy = searchParams.getAll(PARAM_KEY_MAP.SORT_BY);
	const currSortBy = _sortBy.map(x => sortByOptionMap.get(x)).filter(x => x !== undefined);

	const _groupBy = searchParams.get(PARAM_KEY_MAP.GROUP_BY) ?? "";
	const currGroupBy = groupByOptionMap.get(_groupBy) ?? groupByOptionMap.get(null)!;

	const isReverse = searchParams.get(PARAM_KEY_MAP.REVERSE) === "true";



	const getLevel = (value: number) => Math.max(level.min, Math.min(level.max, value));
	const _levelFrom = Number(searchParams.get(PARAM_KEY_MAP.LEVEL_FROM)) || level.min;
	const _levelTo = Number(searchParams.get(PARAM_KEY_MAP.LEVEL_TO)) || level.max;
	const currLevels: [number, number] = [getLevel(_levelFrom), getLevel(_levelTo)];
	const getCategory = (
		groupLabel: string,
		categoryLabel: string,
	) => {
		const group = categoryGroups.find(x => x.label === groupLabel);
		const category = group?.items.find(x => x.label === categoryLabel);
		return category;
	};

	const categories = categoryGroups.map(x => x.items).flat();
	const categoryMap = new Map(categories.map(x => [x.slug, x]));
	const _categories = searchParams.getAll(PARAM_KEY_MAP.CATEGORY);
	const currCategories = _categories.map(x => categoryMap.get(x)).filter(x => x !== undefined);

	const currHasProject = searchParams.get(PARAM_KEY_MAP.HAS_PROJECT) === "true";
	const currHasContribution = searchParams.get(PARAM_KEY_MAP.HAS_CONTRIBUTION) === "true";

	const currViewIcon = searchParams.get(PARAM_KEY_MAP.VIEW_ICON) !== "false";
	const currViewLevel = searchParams.get(PARAM_KEY_MAP.VIEW_LEVEL) !== "false";
	const currViewCategoryGroup = searchParams.get(PARAM_KEY_MAP.VIEW_CATEGORY_GROUP) !== "false";
	const currViewCategory = searchParams.get(PARAM_KEY_MAP.VIEW_CATEGORY) !== "false";
	const currViewProjectCount = searchParams.get(PARAM_KEY_MAP.VIEW_PROJECT_COUNT) !== "false";
	const currViewContributionCount = searchParams.get(PARAM_KEY_MAP.VIEW_CONTRIBUTION_COUNT) !== "false";



	const filteredItems = items.filter(item => {
		const catItem = getCategory(item.group, item.category);
		const categoryMatch = !currCategories.length || currCategories.some(cat => cat.slug === catItem?.slug);

		const levelMatch = item.level.slug >= currLevels[0] && item.level.slug <= currLevels[1];

		const projectMatch = !currHasProject || item.projects > 0;
		const contributionMatch = !currHasContribution || item.contributions > 0;

		return categoryMatch && levelMatch && projectMatch && contributionMatch;
	});

	const groupedItems = ((): Array<
		& InfiniteGroupItem<Item>
		& { sortVal: number | string }
	> => {
		if (!currGroupBy.slug) {
			return [{
				sortVal: 0,
				label: "",
				items: filteredItems,
			}];
		}

		const groupMap = filteredItems.reduce<Map<string, Item[]>>((acc, item) => {
			const key = (
				currGroupBy.slug === "a-z" ? item.label.charAt(0).toUpperCase()
				: currGroupBy.slug === "level" ? item.level.label
				: currGroupBy.slug === "category-group" ? item.group
				: currGroupBy.slug === "category" ? `${item.group} > ${item.category}`
				: ""
			);
			if (!acc.has(key)) {
				acc.set(key, []);
			}
			acc.get(key)!.push(item);

			return acc;
		}, new Map());

		return groupMap.entries().toArray().map(([label, items]) => {
			return {
				label,
				items,
				sortVal: currGroupBy.slug !== "level" ? label : items[0]?.level.slug ?? 0,
			};
		});
	})();

	const sortedGroups = groupedItems.map(group => ({
		...group,
		items: group.items.toSorted((a, b) => {
			for (const sortBy of currSortBy) {
				let comparison = 0;
				switch (sortBy.slug) {
					case "project-count":
						comparison = b.projects - a.projects;
						break;
					case "contribution-count":
						comparison = b.contributions - a.contributions;
						break;
				}
				if (comparison !== 0) {
					return comparison;
				}
			}

			return isReverse ? -1 : 0;
		}),
	})).sort((_a, _b) => {
		const isGroupedLevel = currGroupBy.slug === "level";
		const [a, b] = (
			(isGroupedLevel && !isReverse)
			|| (!isGroupedLevel && isReverse)
		) ? [_b, _a] : [_a, _b];
		return a.sortVal < b.sortVal ? -1 : a.sortVal > b.sortVal ? 1 : 0;
	});



	const handleYearCommitted = (value: [number, number]) => {
		updateParams({
			[PARAM_KEY_MAP.LEVEL_FROM]: value[0] === level.min ? null : value[0].toString(),
			[PARAM_KEY_MAP.LEVEL_TO]: value[1] === level.max ? null : value[1].toString(),
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
		<div className="space-y-12 @container/grid">
			<FilterHeader
				label={label}
				resetButtonProps={{
					resetKeys: filterKeys,
				}}
			>{title}</FilterHeader>

			<FilterSection>
				<SliderBox
					label="Levels"
					min={level.min}
					max={level.max}
					step={level.step}
					value={currLevels}
					onValueCommitted={handleYearCommitted}
				/>

				<ComboboxBox
					multiple
					label="Categories"
					items={categoryGroups}
					value={currCategories}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.CATEGORY, value.map(x => x.slug))}
					isItemEqualToValue={(a, b) => a.slug === b.slug}
				/>

				<SwitchBox
					label="Has Project"
					checked={currHasProject}
					onCheckedChange={checked => handleValueChange(PARAM_KEY_MAP.HAS_PROJECT, checked, false)}
				/>

				<SwitchBox
					label="Has Contribution"
					checked={currHasContribution}
					onCheckedChange={checked => handleValueChange(PARAM_KEY_MAP.HAS_CONTRIBUTION, checked, false)}
				/>
			</FilterSection>

			<InfiniteScroll
				className={cn(
					"grid-cols-1",
					"@2xl/grid:grid-cols-2",
					"@5xl/grid:grid-cols-3",
					"@min-[86rem]/grid:grid-cols-4",
					!currViewIcon && "**:data-[slot=skill-icon]:hidden",
					!currViewLevel && "**:data-[slot=skill-level-badge]:hidden",
				)}
				resetButtonProps={{
					resetKeys: filterKeys,
				}}
				total={items.length}
				items={sortedGroups}
				renderItem={({
					level,
					group,
					category,
					projects,
					contributions,
					...item
				}) => (
					<SkillBox
						key={item.slug}
						level={{
							label: level.label,
							color: level.color,
						}}
						group={currViewCategoryGroup ? group : undefined}
						category={currViewCategory ? category : undefined}
						projects={currViewProjectCount ? projects : undefined}
						contributions={currViewContributionCount ? contributions : undefined}
						{...item}
					/>
				)}
			>
				<PresetActionView
					items={[
						{
							label: "Icon",
							checked: currViewIcon,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_ICON, checked, true),
						},
						{
							label: "Name",
							checked: true,
							disabled: true,
						},
						{
							label: "Level",
							checked: currViewLevel,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_LEVEL, checked, true),
						},
						{
							label: "Category Group",
							checked: currViewCategoryGroup,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_CATEGORY_GROUP, checked, true),
						},
						{
							label: "Category",
							checked: currViewCategory,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_CATEGORY, checked, true),
						},
						{
							label: "Project Count",
							checked: currViewProjectCount,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_PROJECT_COUNT, checked, true),
						},
						{
							label: "Contribution Count",
							checked: currViewContributionCount,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_CONTRIBUTION_COUNT, checked, true),
						},
					]}
				/>

				<ActionRadioMenu
					icon="Layers"
					label={currGroupBy.label}
					items={groupByOptions}
					value={currGroupBy}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.GROUP_BY, value.slug)}
				/>

				<PresetActionMultipleSortBy
					value={currSortBy}
					items={sortByOptions}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.SORT_BY, value.map(x => x.slug))}
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
