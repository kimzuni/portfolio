"use client";

import { cn } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Image } from "@/components/media";
import { Link } from "@/components/link";
import { Icon } from "@/components/icon";
import { PeriodBox } from "@/components/period-box";
import { TagBadge, SkillBadge } from "@/components/project-badge";

import type * as contents from "@/contents";



type BadgeType = typeof badgeTypes[number];
const badgeTypes = [
	"tag",
	"skill",
] as const;

export interface ActiveItem {
	slug: string;
	label: string;
}

export interface ProjectBoxProps extends contents.project.Item {
	maxSkills?: number;
	className?: string;
	activeTags?: ActiveItem[] | null;
	activeSkills?: ActiveItem[] | null;
}

export function ProjectBox({
	slug,
	cover,
	title,
	description,
	period,
	tags,
	skills,
	team,
	maxSkills = 5,
	className,
	activeTags,
	activeSkills,
}: ProjectBoxProps) {
	const href = `/projects/${slug}/`;
	const avgContribution = !team
		? 100
		: Math.round(
			team.contributions.reduce((a, c) => a + c.percentage, 0)
			/ team.contributions.length,
		);

	const badgeMap: Record<BadgeType, {
		max?: number;
		items: ActiveItem[];
		Badge: typeof TagBadge | typeof SkillBadge;
	}> = {
		tag: {
			items: tags,
			Badge: TagBadge,
		},
		skill: {
			max: maxSkills,
			items: skills.slice(0, maxSkills),
			Badge: SkillBadge,
		},
	};

	const activeMap = {
		tag: new Set(activeTags?.map(x => x.slug) ?? []),
		skill: new Set(activeSkills?.map(x => x.slug) ?? []),
	};

	const isActive = (key: BadgeType, value: ActiveItem) => {
		return activeMap[key].has(value.slug);
	}

	return (
		<Card className={cn("max-w-75 w-full gap-2", className)}>
			<CardHeader className="gap-0">
				<PeriodBox
					period={period}
					className="text-xs"
					render={<CardDescription/>}
				/>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col gap-2">
				<Link href={href} className="group rounded-lg space-y-2 hover:text-primary hover:scale-110 transition-[scale]">
					<CardTitle className="overflow-hidden text-ellipsis text-nowrap">{title}</CardTitle>
					<div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
						<div className="absolute inset-0 bg-black/50 text-primary flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
							<Icon icon="CircleArrowRight"/>
						</div>
						<Image
							{...cover}
							alt={`cover - project: ${title}`}
							className="w-full h-full object-cover"
							width={300}
						/>
					</div>
				</Link>

				<p className="empty:hidden line-clamp-2 text-sm text-muted-foreground">
					{description.text}
				</p>
			</CardContent>
			<CardFooter className="flex-1 flex-col items-start pt-2 gap-2 *:flex *:flex-wrap *:gap-1 *:empty:hidden">
				{badgeTypes.map(x => {
					const { max, items, Badge } = badgeMap[x];
					return (
						<div key={x}>
							{items.map(item => <Badge
								key={item.slug}
								label={item.label}
								active={isActive(x, item)}
								icon={null}
							/>)}
							{max !== undefined && skills.length > max && <Badge label={`+${skills.length - max}`}/>}
						</div>
					);
				})}
				{team && (
					<div className="flex-1 w-full items-end text-muted-foreground text-sm">
						<div className="flex items-center gap-1 w-full">
							<span>Contrib.</span>
							<span
								className={cn(
									"flex-1 bg-accent h-2 rounded-full overflow-hidden",
									"before:block before:bg-primary before:h-full before:w-(--avg)",
								)}
								style={{
									"--avg": `${avgContribution}%`,
								} as React.CSSProperties}
							/>
							<span>{avgContribution}%</span>
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
