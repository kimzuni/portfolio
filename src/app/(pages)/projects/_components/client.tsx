"use client";

import { cn } from "@/lib/utils";
import { useSearchParamRouter } from "@/hooks/use-search-param-router";

import { FadeSection } from "@/components/fade";

import {
	ResetButton,
	type FilterItem,
	type FilterGroupItem,
	Slider,
	type SliderProps,
	Switch,
	ComboboxMultiple,
} from "./filter";
import { ProjectGrid } from "./project-grid";

import type * as contents from "@/contents";





interface FilterLabelProps extends React.ComponentProps<"div"> {
	label: string;
}

function FilterLabel({
	label,
	className,
	children,
	...props
}: FilterLabelProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-2",
				className,
			)}
			{...props}
		>
			<span>{label}</span>
			{children}
		</div>
	);
}



export interface ClientProps {
	projects: contents.project.Item[];
	years: [number, number];
	tags: FilterItem[];
	skills: FilterGroupItem[];
};

export function Client({
	years,
	tags,
	skills,
	projects,
}: ClientProps) {
	const { searchParams, updateParams } = useSearchParamRouter({
		engine: "native",
		type: "replace",
	});

	const flattenedSkills = skills.map(x => x.items).flat();
	const tagMap = new Map(tags.map(x => [x.slug, x]));
	const skillMap = new Map(flattenedSkills.map(x => [x.slug, x]));

	const _currYears = searchParams.get("years")?.split(",").map(x => x.trim()).filter(x => x).map(Number) ?? [];
	const currYears: ClientProps["years"] = [_currYears[0] ?? years[0], _currYears[1] ?? years[1]];
	const currTags = searchParams.get("tags")?.split(",").map(x => tagMap.get(x.trim())).filter(x => x != undefined) ?? [];
	const currSkills = searchParams.get("skills")?.split(",").map(x => skillMap.get(x.trim())).filter(x => x != undefined) ?? [];
	const currMatchAllTags = searchParams.get("match-all-tags") === "true";
	const currMatchAllSkills = searchParams.get("match-all-skills") === "true";

	const tagFilterKey = currMatchAllTags ? "every" : "some";
	const skillFilterKey = currMatchAllSkills ? "every" : "some";
	const filteredProjects = projects.filter((project) => {
		const startYear = project.period[0].getFullYear();
		const endYear = (project.period[1] ?? new Date()).getFullYear();
		const yearMatch = !(currYears[0] > endYear || currYears[1] < startYear);

		const tagMatch = !currTags.length ? true : currTags[tagFilterKey](tag => project.tags.find(x => x.slug === tag.slug));
		const skillMatch = !currSkills.length ? true : currSkills[skillFilterKey](skill => project.skills.find(x => x.slug === skill.slug));
		return yearMatch && tagMatch && skillMatch;
	});

	const handleYearsValueChange: SliderProps["onValueChange"] = (...args) => {
		const curr = args[0] as [number, number];
		const join = curr.join(",");
		const isDefault = curr[0] === years[0] && curr[1] === years[1];
		const nextValue = isDefault ? null : join;
		updateParams("years", nextValue);
	};

	const handleSwitchCheckedChange = (key: string, checked: boolean) => {
		updateParams(key, checked ? "true" : null);
	};

	const handleComboboxValueChange = (key: string, value: FilterItem[]) => {
		const items = value.map(x => x.slug);
		updateParams(key, items.length ? items.join(",") : null);
	};

	return (
		<>
			<FadeSection>
				<div className="space-y-6 *:space-y-3 *:w-full *:max-w-md">
					<div>
						<FilterLabel label="Years">
							<span className="text-muted-foreground text-sm">{currYears.join(" ~ ")}</span>
						</FilterLabel>
						<Slider
							min={years[0]}
							max={years[1]}
							value={currYears}
							onValueChange={handleYearsValueChange}
						/>
					</div>

					<div>
						<FilterLabel label="Tags">
							<Switch
								label="Match all"
								checked={currMatchAllTags}
								onCheckedChange={(checked) => handleSwitchCheckedChange("match-all-tags", checked)}
							/>
						</FilterLabel>
						<ComboboxMultiple
							items={tags}
							value={currTags}
							onValueChange={(value) => handleComboboxValueChange("tags", value)}
						/>
					</div>

					<div>
						<FilterLabel label="Skills">
							<Switch
								label="Match all"
								checked={currMatchAllSkills}
								onCheckedChange={(checked) => handleSwitchCheckedChange("match-all-skills", checked)}
							/>
						</FilterLabel>
						<ComboboxMultiple
							items={skills}
							value={currSkills}
							onValueChange={(value) => handleComboboxValueChange("skills", value)}
						/>
					</div>
				</div>
			</FadeSection>

			<FadeSection
				className={cn(
					"container pt-0 grid gap-6",
					"grid-cols-[repeat(auto-fill,minmax(0,300px))] justify-center",
					!filteredProjects.length && "block",
				)}
			>
					<ProjectGrid
						key={filteredProjects.map(x => x.slug).toString()}
						projects={filteredProjects}
						activeTags={currTags}
						activeSkills={currSkills}
						fallback={
							!projects.length
								? "아직 진행한 프로젝트가 없어요 :("
								: <>
									선택한 조건에 맞는 프로젝트가 없어요!
									<br/>
									조건을
									<ResetButton
										label="초기화"
										variant="ghost"
										size="default"
										className="inline p-0 mx-1 text-base text-primary hover:text-primary hover:underline hover:bg-transparent!"
									/>
									하거나 다른 조합을 선택해 보세요
								</>
						}
					/>
			</FadeSection>
		</>
	);
}
