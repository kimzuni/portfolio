import { cn } from "@/lib/utils";
import type { Label as Provider } from "@/contents/contribution/git/provider";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkBadge } from "@/components/link-badge";
import { Link } from "@/components/link";
import { Icon, type IconName } from "@/components/icon";
import { Dot } from "@/components/dot";
import { Time } from "@/components/time";
import { SkillBadge } from "@/components/project-badge";
import { ContentBox } from "@/components/content-box";



export interface StatusInfoItem {
	icon: IconName;
	label: string;
	color: string;
}



export interface StatusInfoProps extends React.ComponentProps<typeof Badge>, StatusInfoItem {
	color: string;
}

export function StatusInfo({
	icon,
	label,
	color,
	className,
	...props
}: StatusInfoProps) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"font-mono",
				"bg-(--color)/10 border-(--color)/25 text-(--color)",
				className,
			)}
			style={{
				"--color": color,
			} as React.CSSProperties}
			{...props}
		>
			<Icon icon={icon} className="w-3.5 h-3.5"/>
			<span>{label}</span>
		</Badge>
	);
}



export interface ContributionBoxNumberItem {
	url: string;
	value: number;
	status: Omit<StatusInfoItem, "label">;
	colors: string[];
}

export interface ContributionBoxBadgeItem {
	slug: string;
	label: string;
}

export interface ContributionBoxItem {
	url: string;
	scope: string | null;
	provider: Provider;
	owner: string;
	repository: string;
	date?: Date;
	status?: StatusInfoItem;
	numbers: ContributionBoxNumberItem[];
	skills?: ContributionBoxBadgeItem[];
	description: React.ReactNode;
}

export interface ContributionBoxProps extends React.ComponentProps<typeof Card>, ContributionBoxItem {
	maxSkills?: number;
	activeSkills?: ContributionBoxBadgeItem[];
}

export function ContributionBox({
	url,
	scope,
	provider,
	owner,
	repository,
	color,
	date,
	status,
	numbers,
	skills = [],
	description,
	maxSkills = 5,
	activeSkills,
	className,
	...props
}: ContributionBoxProps) {
	const hasBadge = skills.length > 0;

	const activeMap = new Set(activeSkills?.map(x => x.slug) ?? []);
	const isActive = (value: ContributionBoxBadgeItem) => {
		return activeMap.has(value.slug);
	}

	return (
		<Card
			className={cn(
				"gap-3 transition-all",
				"hover:ring-(--color)/50 hover:-translate-y-1",
				className,
			)}
			style={{
				"--color": color || status?.color || "var(--primary)",
			} as React.CSSProperties}
			{...props}
		>
			<CardHeader className="space-y-3">
				<div className="flex items-center-safe gap-2 empty:hidden">
					{status && (
						<StatusInfo {...status}/>
					)}

					{date && (
						<div className="flex-1 text-right">
							<Time value={date} className="text-xs text-muted-foreground"/>
						</div>
					)}
				</div>

				<div>
					<Badge variant="ghost" className="p-0 text-muted-foreground pointer-events-none" hidden={!scope}>
						[{scope}]
					</Badge>
					<p className="text-base font-semibold font-mono truncate">
						<Link href={url} className="hover:text-(--color)/70 space-x-1 underline underline-offset-2">
							<span>{owner}/{repository}</span>
							<Icon icon="ExternalLink" size={13} className="inline opacity-70"/>
						</Link>
					</p>
				</div>
			</CardHeader>

			<CardContent
				className={cn(
					"flex-1 flex flex-col gap-3",
					!hasBadge && "has-data-is-empty:hidden",
				)}
			>
				<ContentBox className="flex-1 text-sm prose-ul:pl-4 empty:hidden">
					{description}
				</ContentBox>

				{hasBadge && (
					<ul className="flex flex-wrap gap-1">
						{skills.slice(0, maxSkills).map(item => <li key={item.slug}>
							<SkillBadge
								label={item.label}
								active={isActive(item)}
								icon={null}
							/>
						</li>)}
						{skills.length > maxSkills && <SkillBadge label={`+${skills.length - maxSkills}`}/>}
					</ul>
				)}
			</CardContent>

			{!!numbers.length && (
				<CardFooter className="border-t items-start gap-2">
					<LinkBadge
						icon={provider}
						href={url}
						variant="ghost"
						className="text-base py-0"
					/>
					<ul className="flex flex-wrap gap-3 empty:hidden">
						{numbers.map((n, idx) => (
							<li key={`${n.value}-${idx}`} className="flex items-center-safe gap-1">
								<Icon
									icon={n.status.icon}
									color={n.status.color}
									size={14}
								/>
								<LinkBadge
									icon={null}
									variant="ghost"
									href={n.url}
									label={`#${n.value}`}
									className="p-0 size-fit font-mono hover:text-(--color)"
									style={{
										"--color": n.status.color,
									} as React.CSSProperties}
								/>
								<div className="flex flex-col justify-center-safe items-center-safe gap-1">
									{n.colors.map(color => (
										<Dot
											key={color}
											color={color}
										/>
									))}
								</div>
							</li>
						))}
					</ul>
				</CardFooter>
			)}
		</Card>
	);
}
