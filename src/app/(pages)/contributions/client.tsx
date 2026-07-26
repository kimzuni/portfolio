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
	ContributionBox,
	type StatusInfoItem,
	type ContributionBoxItem,
	type ContributionBoxBadgeItem,
	type ContributionBoxNumberItem,
} from "@/components/contribution-box";
import {
	StatsBox,
	StatsCard,
} from "@/components/stats";



const getRepoSlug = (
	provider: string,
	owner: string,
	repo: string,
) => `${provider}:${owner}:${repo}`.toLowerCase();



const FILTER_KEY_MAP = {
	TYPE: "type",
	STATUS: "status",
	REPOSITORY: "repository",
	SKILL: "skill",
	MATCH_ALL_SKILLS: "match-all-skills",
} as const;

const VIEW_KEY_MAP = {
	VIEW_DATE: "view-date",
	VIEW_STATUSES: "view-statuses",
	VIEW_DESCRIPTION: "view-description",
	VIEW_PRIMARY_SKILLS: "view-primary-skills",
	VIEW_SECONDARY_SKILLS: "view-secondary-skills",
	VIEW_FOOTER: "view-footer",
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
		slug: "pr",
		label: "PR",
	},
	{
		slug: "issue",
		label: "Issue",
	},
];
const typeMap = new Map(types.map(x => [x.slug, x]));



const status: FilterSlugGroupItem<ComboboxItem>[] = [
	{
		label: "Pull Request",
		items: [
			{ slug: "pr:open", label: "Open", chip: "PR > Open" },
			{ slug: "pr:merged", label: "Merged", chip: "PR > Merged" },
		],
	},
	{
		label: "Issue",
		items: [
			{ slug: "issue:open", label: "Open", chip: "Issue > Open" },
			{ slug: "issue:closed", label: "Closed", chip: "Issue > Closed" },
		],
	},
];

const getStatusGroupItems = (type: string | null): FilterSlugGroupItem<ComboboxItem>[] => {
	const find = type && status.find(x => x.items[0]?.slug?.startsWith(type))
	return find ? [find] : status;
};

const getStatusMap = (groups: FilterSlugGroupItem<ComboboxItem>[]) => {
	return new Map(groups.map(x => x.items.map(x => [x.slug, x] as const)).flat());
};



interface RepositoryItem extends ComboboxItem {
	provider: string;
	owner: string;
}

export interface Item extends Omit<Required<ContributionBoxItem>, "skills" | "number"> {
	skills: Record<"primary" | "secondary", ContributionBoxBadgeItem[]>;
	numbers: Array<
		& ContributionBoxNumberItem
		& {
			status: Omit<StatusInfoItem, "label"> & { slug: string };
		}
	>
}

export interface ClientProps {
	label: string;
	title: string;
	repositoryGroups: FilterSlugGroupItem<RepositoryItem>[];
	skillGroups: FilterSlugGroupItem<ComboboxItem>[];
	items: Item[];
	statusInfoMap: Map<string, ContributionBoxItem["status"]>;
	colorLabel: Map<string, string>;
}

export function Client({
	label,
	title,
	repositoryGroups,
	skillGroups,
	items: _items,
	statusInfoMap,
	colorLabel,
}: ClientProps) {
	const { searchParams, updateParams } = useSearchParamRouter({
		engine: "native",
		mode: "replace",
	});

	const items = _items.map(item => ({
		...item,
		repoSlug: getRepoSlug(item.provider, item.owner, item.repository),
	}))

	const isReverse = searchParams.get(PARAM_KEY_MAP.REVERSE) === "true";



	const _type = searchParams.get(PARAM_KEY_MAP.TYPE);
	const currType = typeMap.get(_type) ?? typeMap.get(null)!;

	const _status = searchParams.getAll(PARAM_KEY_MAP.STATUS);
	const status = getStatusGroupItems(currType.slug);
	const statusMap = getStatusMap(status);
	const currStatus = _status.map(x => statusMap.get(x.trim())).filter(x => x != undefined);

	const repositories = repositoryGroups.map(x => x.items).flat();
	const repositoryMap = new Map(repositories.map(x => [x.slug, x]));
	const _repositories = searchParams.getAll(PARAM_KEY_MAP.REPOSITORY);
	const currRepositories = _repositories.map(x => repositoryMap.get(x)).filter(x => x !== undefined);

	const skills = skillGroups.map(x => x.items).flat();
	const skillMap = new Map(skills.map(x => [x.slug, x]));
	const _skills = searchParams.getAll(PARAM_KEY_MAP.SKILL);
	const currSkills = _skills.map(x => skillMap.get(x)).filter(x => x !== undefined);
	const currMatchAllSkills = searchParams.get(PARAM_KEY_MAP.MATCH_ALL_SKILLS) === "true";

	const currViewDate = searchParams.get(PARAM_KEY_MAP.VIEW_DATE) !== "false";
	const currViewStatuses = searchParams.get(PARAM_KEY_MAP.VIEW_STATUSES) !== "false";
	const currViewDescription = searchParams.get(PARAM_KEY_MAP.VIEW_DESCRIPTION) !== "false";
	const currViewPrimarySkills = searchParams.get(PARAM_KEY_MAP.VIEW_PRIMARY_SKILLS) !== "false";
	const currViewSecondarySkills = searchParams.get(PARAM_KEY_MAP.VIEW_SECONDARY_SKILLS) === "true";
	const currViewFooter = searchParams.get(PARAM_KEY_MAP.VIEW_FOOTER) !== "false";



	const skillFilterKey = currMatchAllSkills ? "every" : "some";
	const filteredItems = items.filter((item) => {
		const typeMatch = (
			currType.slug === null
			|| (currType.slug === "pr" && item.numbers.some(x => x.status.slug.startsWith("pr:")))
			|| (currType.slug === "issue" && item.numbers.some(x => x.status.slug.startsWith("issue:")))
		);

		const repoMatch = !currRepositories.length || currRepositories.some(repo => `${repo.provider}:${repo.owner}:${repo.slug}` === item.repoSlug);

		const statusMatch = !currStatus.length || currStatus.some(status => (
			item.numbers.some(x => x.status.slug === status.slug)
		));

		const skillMatch = !currSkills.length ? true : currSkills[skillFilterKey](skill => 
			item.skills.primary.find(x => x.slug === skill.slug)
			|| item.skills.secondary.find(x => x.slug === skill.slug)
		);

		return typeMatch && repoMatch && statusMatch && skillMatch;
	});

	const sortedItems = filteredItems.sort((_a, _b) => {
		const [a, b] = isReverse ? [_b, _a] : [_a, _b];
		return b.date.getTime() - a.date.getTime();
	});



	/**
	 * 통계
	 */
	const stats = {
		repo: {
			total: {
				label: "Total",
				value: new Set(filteredItems.map(x => x.url)).size,
			},
		},
		pr: {
			open: {
				label: "Open",
				value: filteredItems.filter(x => x.numbers.some(n => n.status.slug === "pr:open")).length,
				color: statusInfoMap.get("pr:open")?.color,
				icon: statusInfoMap.get("pr:open")?.icon,
			},
			merged: {
				label: "Merged",
				value: filteredItems.filter(x => x.numbers.some(n => n.status.slug === "pr:merged")).length,
				color: statusInfoMap.get("pr:merged")?.color,
				icon: statusInfoMap.get("pr:merged")?.icon,
			},
		},
		issue: {
			open: {
				label: "Open",
				value: filteredItems.filter(x => x.numbers.some(n => n.status.slug === "issue:open")).length,
				color: statusInfoMap.get("issue:open")?.color,
				icon: statusInfoMap.get("issue:open")?.icon,
			},
			closed: {
				label: "Closed",
				value: filteredItems.filter(x => x.numbers.some(n => n.status.slug === "issue:closed")).length,
				color: statusInfoMap.get("issue:closed")?.color,
				icon: statusInfoMap.get("issue:closed")?.icon,
			},
		},
		label: colorLabel.entries().toArray().map(([color, label]) => ({
			label,
			color,
			value: filteredItems.filter(x => x.numbers.find(x => x.colors.find(x => x === color))).length,
		})),
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
				<TabsBox
					className="pb-2"
					variant="line"
					items={types}
					value={currType}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.TYPE, value.slug)}
				/>

				<ComboboxBox
					multiple
					label="Status"
					items={status}
					value={currStatus}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.STATUS, value.map(x => x.slug))}
					isItemEqualToValue={(a, b) => a.slug === b.slug}
				/>

				<ComboboxBox
					multiple
					label="Repositories"
					items={repositoryGroups}
					value={currRepositories}
					onValueChange={value => handleValueChange(PARAM_KEY_MAP.REPOSITORY, value.map(x => x.slug))}
					isItemEqualToValue={(a, b) => a.slug === b.slug}
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

			<StatsBox
				className={cn(
					"mb-6 grid-cols-1",
					"@xl/grid:grid-cols-2",
					"@3xl/grid:grid-cols-3 @3xl/grid:*:first:col-span-full",
					"@5xl/grid:grid-cols-4 @5xl/grid:*:first:col-span-1",
				)}
			>
				<StatsCard
					iconColor="var(--color-amber-500)"
					icon="FolderGit2"
					label="Repositories"
					items={Object.values(stats.repo)}
				/>
				<StatsCard
					iconColor={statusInfoMap.get("pr:merged")?.color ?? "var(--primary)"}
					icon="GitPullRequest"
					label="Pull Requests"
					items={Object.values(stats.pr)}
				/>
				<StatsCard
					iconColor={statusInfoMap.get("issue:open")?.color ?? "var(--primary)"}
					icon="CircleDot"
					label="Issues"
					items={Object.values(stats.issue)}
				/>
				<StatsCard
					iconColor="var(--primary)"
					icon="GitCommitHorizontal"
					label="Labels"
					items={stats.label.filter(x => x.value)}
				/>
			</StatsBox>

			<InfiniteScroll
				className={cn(
					"grid gap-6 grid-cols-1",
					"grid-cols-1",
					"@xl/grid:grid-cols-2",
					"@5xl/grid:grid-cols-3",
				)}
				resetButtonProps={{
					resetKeys: filterKeys,
				}}
				total={items.length}
				items={sortedItems}
				renderItem={({
					repoSlug,
					status,
					date,
					skills,
					description,
					numbers,
					...item
				}, idx) => (
					<ContributionBox
						key={`${repoSlug}-${idx}`}
						date={currViewDate ? date : undefined}
						status={currViewStatuses ? status : undefined}
						skills={[
							...(currViewPrimarySkills ? skills.primary : []),
							...(currViewSecondarySkills ? skills.secondary : []),
						]}
						description={currViewDescription ? description : []}
						numbers={currViewFooter ? numbers : []}
						activeSkills={currSkills}
						{...item}
					/>
				)}
			>
				<PresetActionView
					items={[
						{
							label: "Date",
							checked: currViewDate,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_DATE, checked, true),
						},
						{
							label: "Statuses",
							checked: currViewStatuses,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_STATUSES, checked, true),
						},
						{
							label: "Repository",
							checked: true,
							disabled: true,
						},
						{
							label: "Description",
							checked: currViewDescription,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_DESCRIPTION, checked, true),
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
						{
							label: "Footer",
							checked: currViewFooter,
							onCheckedChange: checked => handleValueChange(PARAM_KEY_MAP.VIEW_FOOTER, checked, true),
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
