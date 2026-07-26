import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";

import { FadeHeader, FadeSection, FadeArticle } from "@/components/fade";
import { Item, ItemContent, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog";
import { PageBadge } from "@/components/page-badge";
import { Icon } from "@/components/icon";
import { PeriodBox } from "@/components/period-box";
import { ContentBox } from "@/components/content-box";
import { Heading } from "@/components/heading";
import { Shield } from "@/components/shield";
import { LinkBadge } from "@/components/link-badge";
import { LinkButton } from "@/components/link-button";
import { TagBadge, SkillBadge } from "@/components/project-badge";
import { Media } from "@/components/media";

import * as contents from "@/contents";



export type Props = PageProps<"/projects/[project]">;



async function getProjectOrNotFound({ params }: Props) {
	const { project } = await params;
	const slug = decodeURIComponent(project);
	if (!contents.project.map.has(slug)) {
		return notFound();
	}
	return contents.project.map.get(slug)!;
}



export async function generateMetadata(props: Props) {
	const data = await getProjectOrNotFound(props);
	return seo.createMetadata({
		title: `${data.name} - 프로젝트`,
		description: data.description.lines,
	})
}




interface InfoBadgeProps extends React.ComponentProps<typeof Badge> {
}

function InfoBadge({
	className,
	...props
}: InfoBadgeProps) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"border-primary font-mono",
				className,
			)}
			{...props}
		/>
	);
}



interface BadgeContainerProps extends React.ComponentProps<"div"> {
	label: string;
}

function BadgeContainer({
	label,
	className,
	children,
	...props
}: BadgeContainerProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-1.5",
				className,
			)}
			{...props}
		>
			<span className="opacity-80 text-sm font-semibold">{label}</span>
			<div className="flex flex-wrap gap-2 border-l-3 pl-2 py-0.5">
				{children}
			</div>
		</div>
	);
}



function ContributionDialog({
	description,
	contributions,
}: contents.project.Team) {
	return (
		<Dialog>
			<DialogTrigger
				className="border hover:text-primary hover:border-primary! dark:border-input"
				render={<LinkButton
					variant="secondary"
					label="상세 보기"
				/>}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>역할 및 기여도 상세 정보</DialogTitle>
					<DialogDescription
						className="empty:hidden"
						render={<ContentBox>{description.result}</ContentBox>}
					/>
				</DialogHeader>
				<ScrollArea className="space-y-4 mt-4 -mx-4 max-h-[50vh] px-4">
					{contributions.map(({ label, percentage, description }) => (
						<div key={label} className="flex flex-col gap-2 not-last:mb-3 not-last:pb-3 not-last:border-b">
							<div className="flex items-center justify-between">
								<h2 className="font-semibold font-mono">{label}</h2>
								<span className="text-sm text-muted-foreground">
									{percentage}%
								</span>
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
							<ContentBox className="prose-sm prose-li:my-0 data-is-empty:hidden">
								{description?.result}
							</ContentBox>
						</div>
					))}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}



function Article({
	linkedToPrevious,
	maxWidth,
	blocks,
}: contents.project.Article) {
	const cols = blocks.reduce((acc, cur) => acc + (cur.colSpan || 1), 0);

	return (
		<div
			className={cn(
				"grid grid-cols-1 gap-x-16 gap-y-8 @5xl:gap-x-12 auto-rows-auto mx-auto",
				"@5xl:grid-cols-(--cols) max-w-(--max-width)",
				linkedToPrevious ? "mt-4" : "mt-16",
			)}
			style={{
				"--cols": `repeat(${cols}, minmax(0, 1fr))`,
				"--max-width": typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth ?? "none",
			} as React.CSSProperties}
		>
			{blocks.map((block, idx) => (
				<FadeArticle
					key={idx}
					className={cn(
						"empty:hidden",
						"grid grid-rows-subgrid items-center-safe gap-y-2",
						"col-span-1 @5xl:col-span-(--col-span)",
						"row-span-(--row-span) @5xl:row-span-2",
					)}
					style={{
						"--col-span": block.colSpan || 1,
						"--row-span": block.media && block.text.raw ? 2 : 1,
					} as React.CSSProperties}
				>
					{block.media && (
							<Media
								{...block.media}
								{...(block.media.type !== "image" ? {} : {
									sizes: `(max-width: 768px) 100vw, ${100 / cols * (block.colSpan ?? 1)}vw`,
									zoomable: true,
								})}
								figureClassName={cn(
									"mx-auto",
									!block.text.lines?.length && "row-span-2",
									block.media.figureClassName,
								)}
								className={cn(
									"rounded-lg shadow-sm justify-self-center-safe",
									block.text.lines?.length ? "self-end-safe" : "self-center-safe row-span-2",
									block.media.className,
								)}
							/>
					)}

					{!!block.text.lines?.length && (
						<ContentBox
							className={cn(
								"empty:hidden mx-auto py-2 w-fit font-medium",
								block.media ? "self-start" : "self-center-safe row-span-2",
								blocks.length === 1 && "items-center-safe",
							)}
						>
							{block.text.result}
						</ContentBox>
					)}
				</FadeArticle>
			))}
		</div>
	);
}



export default async function Project(props: Props) {
	const {
		name,
		description,
		highlights,
		period,
		tags,
		skills,
		shields,
		links,
		team,
		articles,
		isOngoing: _isOngoing,
	} = await getProjectOrNotFound(props);

	const isOngoing = (
		_isOngoing
		?? (
			!period[1]
			|| period[1] > new Date()
		)
	);

	return (
		<div className="space-y-8">
			{/* Header */}
			<FadeHeader className="space-y-4 max-w-3xl">
				<div className="flex flex-wrap items-center gap-3">
					<PageBadge label="Project Detail"/>
					{team && (
						<InfoBadge>
							<Icon icon="Users"/>
							Team
						</InfoBadge>
					)}
					{isOngoing && (
						<InfoBadge>
							<Icon icon="RefreshCcw"/>
							Ongoing
						</InfoBadge>
					)}
				</div>

				<Heading level={1}>{name}</Heading>

				<PeriodBox
					period={period}
					className="text-muted-foreground text-sm"
				/>

				<div className="flex flex-wrap gap-2 empty:hidden py-2">
					{shields?.map((props, idx) => <Shield
						key={idx}
						{...props}
					/>)}
				</div>

				<ContentBox className="text-base sm:text-lg leading-relaxed">
					{description.result}
				</ContentBox>

				<ContentBox className="text-base sm:text-lg leading-relaxed empty:hidden">
					{highlights.result}
				</ContentBox>
			</FadeHeader>

			<FadeSection className="space-y-8">
				{/* links */}
				<div className="space-y-6">
					{!!links?.length && (
						<BadgeContainer label="Links">
							{links?.map(badge => (
								<LinkBadge
									key={badge.label}
									variant="ghost"
									className="font-mono hover:text-primary"
									{...badge}
								/>
							))}
						</BadgeContainer>
					)}

					{!!tags.length && (
						<BadgeContainer label="Tags">
							{tags.map(tag => <TagBadge
								key={tag.slug}
								icon="Funnel"
								label={tag.label}
								href={`/projects/?tag=${tag.slug}`}
							/>)}
						</BadgeContainer>
					)}

					{!!skills.primary.length && (
						<BadgeContainer label="Primary Skills">
							{skills.primary.map(skill => <SkillBadge
								key={skill.slug}
								icon="Funnel"
								label={skill.label}
								href={`/projects/?skill=${skill.slug}`}
							/>)}
						</BadgeContainer>
					)}

					{!!skills.secondary.length && (
						<BadgeContainer label="Secondary Skills">
							{skills.secondary.map(skill => <SkillBadge
								key={skill.slug}
								icon="Funnel"
								label={skill.label}
								href={`/projects/?skill=${skill.slug}`}
							/>)}
						</BadgeContainer>
					)}
				</div>

				{team && (
					<Item variant="outline" className="shadow-xs">
						<ItemMedia variant="image">
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
							<ContributionDialog {...team}/>
						</ItemActions>
					</Item>
				)}

				<Separator/>
			</FadeSection>

			{/* Sections */}
			<FadeSection className="@container">
				{articles.map((article, idx) => <Article
					key={idx}
					{...article}
				/>)}
			</FadeSection>
		</div>
	);
}
