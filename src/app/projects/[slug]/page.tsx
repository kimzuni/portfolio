import { notFound } from "next/navigation";
import type { StaticImageData } from "next/image";

import type { Period as PeriodType } from "@/types";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Item, ItemContent, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBadge } from "@/components/page-badge";
import { Icon } from "@/components/icon";
import { Fade } from "@/components/fade";
import { Period } from "@/components/period";
import { LinkBadge, type LinkBadgeProps } from "@/components/link-badge";
import { Media, type MediaProps } from "@/components/media";
import { Shield, type ShieldProps } from "@/components/shield";
import { TagBadge, SkillBadge } from "../_components/badge";

import type { Skill } from "@/contents/skills";
import { slugs, projectMap, type Tag } from "@/contents/projects";



export interface Props extends PageProps<"/projects/[slug]"> {
}



export interface Block {
	colSpan?: number;
	lines?: Array<string | string[]>;
	media?: MediaProps;
}

export interface Section {
	blocks: Block[];
}

export interface Contribution {
	label: string;
	percentage: number;
	description?: string;
}

export interface Team {
	size?: number;
	isAtLeast?: boolean;
	description?: string;
	contributions: Contribution[];
}



export interface ProjectData {
	slug: string;
	isOngoing?: boolean;
	cover: StaticImageData | string;
	title: string;
	description: string | string[];
	period: PeriodType;
	tags: Tag[];
	skills: Skill[];
	sections: Section[];
	shields?: ShieldProps[];
	badges?: LinkBadgeProps[];
	team?: Team;
}



function getProjectOrNotFound(slug: string) {
	slug = decodeURIComponent(slug);
	if (!slugs.includes(slug)) {
		return notFound();
	}
	return projectMap[slug];
}



export function generateStaticParams() {
	return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const { title, description, cover } = getProjectOrNotFound(slug);

	return createMetadata({
		title: `프로젝트 - ${title}`,
		description: description,
		cover: cover,
	});
}



function ContributionDialog({ description, contributions }: { description?: string; contributions: Contribution[] }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" className="hover:text-primary">
					기여도 보기
				</Button>
			</DialogTrigger>
			<DialogContent className="**:data-[slot=dialog-close]:cursor-pointer">
				<DialogHeader>
					<DialogTitle>기여도</DialogTitle>
					<DialogDescription
						className="empty:hidden"
						children={description}
					/>
				</DialogHeader>
				<div className="space-y-4 mt-4">
					{contributions.map(({ label, percentage, description }, idx) => (
						<div key={label} className="space-y-2">
							{idx !== 0 && <Separator/>}
							<div className="flex items-center justify-between">
								<h2 className="font-semibold font-mono">{label}</h2>
								<span
									className="text-sm text-muted-foreground"
									children={`${percentage}%`}
								/>
							</div>
							<div
								className={cn(
									"h-2 bg-muted rounded-full overflow-hidden",
									"before:block before:h-full before:w-(--percentage) before:bg-primary before:rounded-full",
									"before:transition-all",
								)}
								style={{
									"--percentage": `${percentage}%`,
								} as React.CSSProperties}
							/>
							<p className="empty:hidden text-sm text-muted-foreground">{description}</p>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function Section({ blocks }: Section) {
	const cols = blocks.reduce((acc, cur) => acc + (cur.colSpan || 1), 0);
	const onlyText = blocks.every(x => !x.media);

	return (
		<Fade
			className={cn(
				"grid grid-cols-1 md:grid-cols-(--cols) gap-x-16 gap-y-8 md:gap-x-6 xl:gap-x-12 auto-rows-auto",
				onlyText ? "mt-0!" : "",
			)}
			style={{
				"--cols": `repeat(${cols}, minmax(0, 1fr))`,
			} as React.CSSProperties}
		>
			{blocks.map((block, idx) => (
				<div
					key={idx}
					className="col-span-1 md:col-span-(--col-span) grid grid-rows-subgrid row-span-2 gap-y-2"
					style={{
						"--col-span": block.colSpan || 1,
					} as React.CSSProperties}
				>
					{block.media && (
						<div className="flex justify-center items-end">
							<Media
								{...block.media}
								className={cn("rounded-lg shadow-sm", block.media.className)}
							/>
						</div>
					)}

					{block.lines && (
						<div
							className={cn(
								"text-muted-foreground font-medium py-2 flex flex-col gap-2 justify-center-safe items-start",
								!block.media && "row-span-2",
							)}
						>
							{block.lines.map((line) => {
								const text = Array.isArray(line) ? line.join(" ") : line;
								return <p key={text}>{text}</p>;
							})}
						</div>
					)}
				</div>
			))}
		</Fade>
	);
}



export default async function Project({ params }: Props) {
	const { slug } = await params;
	const {
		title,
		description,
		period,
		tags,
		skills,
		shields,
		badges,
		team,
		sections,
		...props
	} = getProjectOrNotFound(slug);

	const isOngoing = (
		props.isOngoing
		?? (
			!period[1]
			|| period[1] > new Date()
		)
	);

	return (
		<div className="container space-y-8">
			{/* Header */}
			<header className="space-y-4">
				<div className="flex flex-wrap items-center gap-3">
					<PageBadge label="Project Detail"/>
					{isOngoing && (
						<Badge variant="outline" className="border-primary font-mono">
							<Icon icon="RefreshCcw"/>
							Ongoing
						</Badge>
					)}
				</div>

				<Period
					start={period[0]}
					end={period[1]}
					className="text-muted-foreground text-sm"
				/>

				<h1 className="title">
					{title}
				</h1>

				<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
					{Array.isArray(description) ? description.join(" ") : description}
				</p>
			</header>

			{/* badges */}
			<div className="space-y-6 *:flex *:flex-wrap *:gap-2 *:empty:hidden">
				<div>
					{shields?.map((props, idx) => <Shield
						key={idx}
						{...props}
					/>)}
				</div>

				<div>
					{badges?.map(({ className, ...badge }) => (
						<LinkBadge
							key={badge.label}
							variant="ghost"
							className={cn("font-mono", className)}
							{...badge}
						/>
					))}
				</div>

				<div>
					{tags.map(tag => <TagBadge
						key={tag}
						label={tag}
						href={`/projects/?tags=${tag}`}
					/>)}
				</div>

				<div>
					{skills.map(skill => <SkillBadge
						key={skill}
						label={skill}
						href={`/projects/?skills=${skill}`}
					/>)}
				</div>
			</div>

			{team && (
				<Item variant="outline" className="shadow-xs">
					<ItemMedia variant="icon">
						<Icon icon="ChartBar"/>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>
							{team.size && `${team.size}인 ${team.isAtLeast ? "이상 " : ""}`}
							팀 프로젝트
						</ItemTitle>
						<ItemDescription>
							역할과 기여 비율을 자세히 확인해 보세요.
						</ItemDescription>
					</ItemContent>
					<ItemActions>
						<ContributionDialog contributions={team.contributions}/>
					</ItemActions>
				</Item>
			)}

			<Separator/>

			{/* Sections */}
			<div className="*:mt-16">
				{sections.map((section, idx) => <Section
					key={idx}
					{...section}
				/>)}
			</div>
		</div>
	);
}
