import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Image } from "@/components/media";
import { Link } from "@/components/link";
import { Icon } from "@/components/icon";
import { Period } from "@/components/period";

import type { ProjectMeta } from "../client";
import { TagBadge, SkillBadge } from "../_components/badge";



export interface ProjectBoxProps extends ProjectMeta {
	maxSkills?: number;
	className?: string;
	badgeOnClick?: (key: "tag" | "skill", value: string) => unknown;
	activeTags?: string[] | null;
	activeSkills?: string[] | null;
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
	badgeOnClick,
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

	return (
		<Card className={cn("max-w-[300px] w-full gap-2", className)}>
			<CardHeader className="gap-0">
				<Period
					start={period[0]}
					end={period[1]}
					as={CardDescription}
					className="text-xs"
				/>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col gap-2">
				<Link href={href} className="group rounded-lg space-y-2 hover:text-primary hover:scale-110 transition-[scale]">
					<CardTitle className="overflow-hidden text-ellipsis text-nowrap">{title}</CardTitle>
					<div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
						<div className="absolute inset-0 bg-black/50 text-primary flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
							<Icon icon="ArrowRightCircle"/>
						</div>
						<Image
							src={cover}
							alt={`${title} cover`}
							loading="lazy"
							className="w-full h-full object-cover"
						/>
					</div>
				</Link>

				<p className="empty:hidden line-clamp-2 text-sm text-muted-foreground">
					{
						Array.isArray(description) ? description.join(" ") : description
					}
				</p>
			</CardContent>
			<CardFooter className="flex-col justify-center-safe items-start pt-2 gap-2 *:flex *:flex-wrap *:gap-1 *:empty:hidden">
				<div>
					{tags.map(tag => <TagBadge
						key={tag}
						label={tag}
						active={activeTags?.includes(tag)}
						activeIcon={badgeOnClick ? "FunnelX" : undefined}
						icon={badgeOnClick ? "FunnelPlus" : undefined}
						href={!badgeOnClick ? `/projects/?tags=${tag}` : undefined}
						onClick={!badgeOnClick ? undefined : () => badgeOnClick("tag", tag)}
					/>)}
				</div>
				<div>
					{skills.slice(0, maxSkills).map(skill => <SkillBadge
						key={skill}
						label={skill}
						active={activeSkills?.includes(skill)}
						activeIcon={badgeOnClick ? "FunnelX" : undefined}
						icon={badgeOnClick ? "FunnelPlus" : undefined}
						href={!badgeOnClick ? `/projects/?skills=${skill}` : undefined}
						onClick={!badgeOnClick ? undefined : () => badgeOnClick("skill", skill)}
					/>)}
					{skills.length > maxSkills && <SkillBadge label={`+${skills.length - maxSkills}`}/>}
				</div>
				<div className="w-full items-center text-muted-foreground text-sm">
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
			</CardFooter>
		</Card>
	);
}
