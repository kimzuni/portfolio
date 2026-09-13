"use client";

import type { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, type GenerateImageThemedMap } from "@/components/media";
import { Link } from "@/components/link";
import { Icon } from "@/components/icon";
import { PeriodBox, type Period } from "@/components/period-box";
import { TagBadge, SkillBadge } from "@/components/project-badge";



type BadgeType = typeof badgeTypes[number];
const badgeTypes = [
	"tag",
	"skill",
] as const;

export interface ProjectBoxBadgeItem {
	slug: string;
	label: string;
}

export interface ProjectBoxItem {
	slug: string;
	cover?: StaticImageData | GenerateImageThemedMap<StaticImageData> | null;
	name: string;
	description?: string | string[];
	period?: Period<Date>;
	tags?: ProjectBoxBadgeItem[];
	skills?: ProjectBoxBadgeItem[];
	isTeam: boolean;
}

export interface ProjectBoxProps extends React.ComponentProps<typeof Card>, ProjectBoxItem {
	maxSkills?: number;
	className?: string;
	activeTags?: ProjectBoxBadgeItem[];
	activeSkills?: ProjectBoxBadgeItem[];
}

export function ProjectBox({
	slug,
	cover,
	name,
	description,
	period,
	tags = [],
	skills = [],
	isTeam,
	maxSkills: _maxSkills = 5,
	activeTags,
	activeSkills,
	className,
	...props
}: ProjectBoxProps) {
	const maxSkills = _maxSkills < 0 ? skills.length : _maxSkills;
	const href = `/projects/${slug}/`;

	const badgeMap: Record<BadgeType, {
		max?: number;
		items: ProjectBoxBadgeItem[];
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

	const isActive = (key: BadgeType, value: ProjectBoxBadgeItem) => {
		return activeMap[key].has(value.slug);
	}

	return (
		<Card
			className={cn(
				"relative max-w-75 w-full gap-2 transition-all",
				"hover:ring-primary/70",
				"hover:-translate-y-1",
				className,
			)}
			{...props}
		>
			{isTeam && (
				<Badge variant="ghost" className="absolute top-2 right-1 text-primary pointer-events-none">
					<Icon icon="Users"/>
				</Badge>
			)}
			<CardHeader className="gap-0 empty:hidden">
				{period && (
					<PeriodBox
						period={period}
						className="text-xs"
						render={<CardDescription/>}
					/>
				)}
			</CardHeader>
			<CardContent className="flex-1 flex flex-col gap-2">
				<Link href={href} className="group/projectbox-link rounded-lg space-y-2 hover:text-primary">
					<CardTitle className="truncate font-semibold">{name}</CardTitle>
					{cover === undefined ? null : (
						<div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
							<div className="absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover/projectbox-link:opacity-100 transition-opacity">
								<Icon icon="CircleArrowRight"/>
							</div>
							{
								cover === null ? (
									<div
										className={cn(
											"flex items-center-safe justify-center-safe bg-background/30",
											"w-full h-full object-cover",
											"text-center text-muted-foreground font-medium italic",
											"after:block after:content-['No_Image_Available']",
										)}
									/>
								) : (
									<Image
										{...cover}
										alt={`cover - project: ${name}`}
										className="w-full h-full object-cover"
										width={300}
									/>
								)
							}
						</div>
					)}
					{description && (
						<p className="line-clamp-2 text-sm text-muted-foreground group-hover/projectbox-link:text-inherit">
							{description}
						</p>
					)}
				</Link>
			</CardContent>
			<CardFooter className="flex-1 flex-col items-start pt-2 gap-2 *:flex *:flex-wrap *:gap-x-1 *:gap-y-2 empty:hidden">
				{badgeTypes.map(x => {
					const { max, items, Badge } = badgeMap[x];
					if (!items.length) return null;

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
			</CardFooter>
		</Card>
	);
}
