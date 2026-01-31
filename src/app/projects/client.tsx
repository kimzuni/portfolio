"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { cn, compareFn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { PageBadge } from "@/components/page-badge";
import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { ComboboxMultiple } from "@/components/combobox";
import { Fade } from "@/components/fade";
import { ProjectBox } from "./_components/project-box";

import type { Skill } from "@/contents/skills";
import type { Tag } from "@/contents/projects";
import type { ProjectData } from "../projects/[slug]/page";



export type MetaKey =
	| "slug"
	| "cover"
	| "title"
	| "description"
	| "period"
	| "tags"
	| "skills"
	| "team";

export interface ProjectMeta extends Pick<ProjectData, MetaKey> {
}

export interface ProjectsPageData {
	label: string;
	heading: string;
	resetButton: Omit<LinkButtonProps, "href" | "onClick">;
	projects: ProjectMeta[];
}



export interface ClientProps extends ProjectsPageData {
}

export default function Client({
	label,
	heading,
	resetButton,
	projects,
}: ClientProps) {
	const { years, tags, skills } = useMemo(() => {
		const currYear = new Date().getFullYear();

		let minYear: number | undefined;
		let maxYear: number | undefined;
		const tags: Set<Tag> = new Set();
		const skills: Set<Skill> = new Set();
		for (const project of projects) {
			const startDate = project.period[0].getFullYear();
			const endDate = project.period[1]?.getFullYear() ?? currYear;
			minYear = Math.min(minYear ?? startDate, startDate);
			maxYear = Math.max(maxYear ?? endDate, endDate);
			project.tags.map(x => tags.add(x));
			project.skills.map(x => skills.add(x));
		}
		return {
			years: [minYear ?? currYear, maxYear ?? currYear] as const,
			tags: [...tags].sort(compareFn),
			skills: [...skills].sort(compareFn),
		};
	}, [projects]);



	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateSearchParams = useCallback((key: string, value: string | string[] | null) => {
		const newParams = new URLSearchParams(searchParams);
		value = Array.isArray(value) ? value.join(",") : value;
		if (!value) {
			newParams.delete(key);
		} else {
			newParams.set(key, value);
		}
		let string = newParams.toString();
		string = string ? `?${string}` : "";
		router.replace(`${pathname}${string}`, { scroll: false });
	}, [router, pathname, searchParams]);

	const yearsString = years.join(",");
	const updateFilter = useCallback((
		key: "years" | "tags" | "skills",
		values: string[] | number[],
	) => {
		const value = values.join(",");
		const isDefault =
			key === "years"
				? value === yearsString
				: values.length === 0;

		updateSearchParams(key, isDefault ? null : value);
	}, [yearsString, updateSearchParams]);

	const resetFilters = () => {
		router.replace(pathname);
	};



	const selectedYears = useMemo(() => {
		return searchParams.get("years")?.split(",").map(Number) ?? [...years];
	}, [searchParams, years]);

	const [localYears, setLocalYears] = useState(selectedYears);
	useEffect(() => {
		setLocalYears(selectedYears);
	}, [selectedYears]);

	const selectedTags = searchParams.get("tags")?.split(",").map(x => x.trim()) ?? null;
	const selectedSkills = searchParams.get("skills")?.split(",").map(x => x.trim()) ?? null;
	const disableResetButton = !searchParams.keys().toArray().length;

	const matchAllTags = searchParams.get("match-all-tags") === "true";
	const matchAllSkills = searchParams.get("match-all-skills") === "true";
	const updateMatchAll = (key: "match-all-tags" | "match-all-skills", value: boolean) => {
		updateSearchParams(key, value ? "true" : null);
	};

	const filteredProjects = useMemo(() => {
		const tagFilterKey = matchAllTags ? "every" : "some";
		const skillFilterKey = matchAllSkills ? "every" : "some";

		return projects.filter((project) => {
			const startYear = project.period[0].getFullYear();
			const endYear = (project.period[1] ?? new Date()).getFullYear();
			const yearMatch = !(selectedYears[0] > endYear || selectedYears[1] < startYear);

			const tagMatch = !selectedTags ? true : selectedTags[tagFilterKey](tag => project.tags.includes(tag as Tag));
			const skillMatch = !selectedSkills ? true : selectedSkills[skillFilterKey](skill => project.skills.includes(skill as Skill));
			return yearMatch && tagMatch && skillMatch;
		});
	}, [projects, matchAllTags, matchAllSkills, selectedYears, selectedTags, selectedSkills]);

	return (
		<>
			<section className="container space-y-12">
				<div className="flex items-center justify-between mb-0">
					<PageBadge
						className="mb-4"
						label={label}
					/>
					<LinkButton
						{...resetButton}
						onClick={resetFilters}
						disabled={disableResetButton}
						aria-disabled={disableResetButton}
					/>
				</div>

				<h1 className="title">{heading}</h1>

				{/* filter */}
				<div className="space-y-6 *:space-y-3 *:w-full *:max-w-md">
					<div>
						<div className="flex items-center justify-between gap-2">
							<Label asChild><span>Years</span></Label>
							<span className="text-muted-foreground text-sm">{localYears.join(" ~ ")}</span>
						</div>
						<Slider
							className="pt-1 pb-2"
							min={years[0]}
							max={years[1]}
							step={1}
							value={localYears}
							onValueChange={setLocalYears}

							// radix ui issue: max 값 이동 시 min 값과 같을 경우 onValueCommit이 호출되지 않음
							onValueCommit={values => updateFilter("years", values)}
						/>
					</div>

					<div>
						<div className="flex items-center justify-between gap-2">
							<Label asChild><span>Tags</span></Label>
							<Field orientation="horizontal" className="w-fit gap-2">
								<FieldLabel className="text-muted-foreground text-sm">Match all</FieldLabel>
								<Switch
									size="sm"
									checked={matchAllTags}
									onCheckedChange={value => updateMatchAll("match-all-tags", value)}
								/>
							</Field>
						</div>
						<ComboboxMultiple
							items={tags}
							value={selectedTags}
							onValueChange={values => updateFilter("tags", values)}
						/>
					</div>

					<div>
						<div className="flex items-center justify-between gap-2">
							<Label asChild><span>Skills</span></Label>
							<Field orientation="horizontal" className="w-fit gap-2">
								<FieldLabel className="text-muted-foreground text-sm">Match all</FieldLabel>
								<Switch
									size="sm"
									checked={matchAllSkills}
									onCheckedChange={value => updateMatchAll("match-all-skills", value)}
								/>
							</Field>
						</div>
						<ComboboxMultiple
							items={skills}
							value={selectedSkills}
							onValueChange={values => updateFilter("skills", values)}
						/>
					</div>
				</div>
			</section>

			<Fade asChild>
				<section
					className={cn(
						"container pt-0 grid gap-6",
						"grid-cols-[repeat(auto-fill,minmax(0,300px))] justify-center",
						!filteredProjects.length && "block",
					)}
				>
					{filteredProjects.map(project => (
						<ProjectBox
							{...project}
							key={project.slug}
						/>
					))}
					{
						filteredProjects.length
							? undefined
							: (
								<p className="text-center">
									선택한 필터 조건에 맞는 프로젝트가 없어요!
									<br/>
									필터를
									{" "}
									<Button className="p-0 text-base" variant="link" onClick={resetFilters}>초기화</Button>
									{" "}
									하거나 다른 조합을 선택해 보세요 :)
								</p>
							)
					}
				</section>
			</Fade>
		</>
	);
}
