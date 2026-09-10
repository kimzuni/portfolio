import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";

import { Fade, FadeSection } from "@/components/fade";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Item, ItemContent, ItemActions, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PageBadge } from "@/components/page-badge";
import { Icon } from "@/components/icon";
import { PeriodBox } from "@/components/period-box";
import { MarkdownBox } from "@/components/markdown-box";
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
	if (!contents.project.has(slug)) {
		return notFound();
	}
	return contents.project.get(slug)!;
}



export async function generateMetadata(props: Props) {
	const data = await getProjectOrNotFound(props);
	return seo.createMetadata({
		title: `${data.title} - 프로젝트`,
		description: data.description.raw,
	})
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
					label="기여도 보기"
				/>}
			/>
			<DialogContent className="**:data-[slot=dialog-close]:cursor-pointer">
				<DialogHeader>
					<DialogTitle>기여도</DialogTitle>
					<DialogDescription
						className="empty:hidden"
						render={<MarkdownBox source={description}/>}
					/>
				</DialogHeader>
				<div className="space-y-4 mt-4">
					{contributions.map(({ label, percentage, description }, idx) => (
						<div key={label} className="space-y-2">
							{idx !== 0 && <Separator/>}
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
							<MarkdownBox className="prose-sm" source={description}/>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}



function Article({ blocks }: contents.project.Article) {
	const cols = blocks.reduce((acc, cur) => acc + (cur.colSpan || 1), 0);
	const onlyText = blocks.every(x => !x.media);

	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-(--cols) gap-x-16 gap-y-8 md:gap-x-6 xl:gap-x-12 auto-rows-auto",
				onlyText ? "mt-0!" : "",
			)}
			style={{
				"--cols": `repeat(${cols}, minmax(0, 1fr))`,
			} as React.CSSProperties}
		>
			{blocks.map((block, idx) => (
				<Fade
					tagName="article"
					key={idx}
					className="col-span-1 md:col-span-(--col-span) grid grid-rows-subgrid row-span-2 items-center-safe gap-y-2"
					style={{
						"--col-span": block.colSpan || 1,
					} as React.CSSProperties}
				>
					{block.media && (
							<Media
								{...(block.media.type !== "image" ? {} : {
									sizes: `(max-width: 768px) 100vw, ${100 / cols}vw`,
								})}
								{...block.media}
								className={cn("rounded-lg shadow-sm", block.media.className)}
							/>
					)}

					{block.text && (
						<MarkdownBox
							source={block.text}
							className={cn(
								"h-full text-muted-foreground font-medium py-2 flex flex-col gap-2 justify-start items-start",
								"[&_a]:underline [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:transition-colors",
								!block.media && "row-span-2 justify-center-safe",
								blocks.length === 1 && "items-center-safe",
							)}
						/>
					)}
				</Fade>
			))}
		</div>
	);
}



export default async function Project(props: Props) {
	const {
		title,
		description,
		period,
		tags: _tags,
		skills: _skills,
		shields,
		badges,
		team,
		articles,
		isOngoing: _isOngoing,
	} = await getProjectOrNotFound(props);

	const tags = _tags.sort((a, b) => a.label.localeCompare(b.label));
	const skills = _skills.sort((a, b) => a.label.localeCompare(b.label));

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
			<Fade tagName="header" className="space-y-4">
				<div className="flex flex-wrap items-center gap-3">
					<PageBadge label="Project Detail"/>
					{isOngoing && (
						<Badge variant="outline" className="border-primary font-mono">
							<Icon icon="RefreshCcw"/>
							Ongoing
						</Badge>
					)}
				</div>

				<PeriodBox
					start={period[0]}
					end={period[1]}
					className="text-muted-foreground text-sm"
				/>

				<Heading level={1}>{title}</Heading>

				<MarkdownBox
					source={description}
					className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl"
				/>
			</Fade>

			<FadeSection className="space-y-8">
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
								className={cn("font-mono hover:text-primary", className)}
								{...badge}
							/>
						))}
					</div>

					<div>
						{tags.map(tag => <TagBadge
							key={tag.slug}
							label={tag.label}
							href={`/projects/?tags=${tag.slug}`}
						/>)}
					</div>

					<div>
						{skills.map(skill => <SkillBadge
							key={skill.slug}
							label={skill.label}
							href={`/projects/?skills=${skill.slug}`}
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
							<ContributionDialog {...team}/>
						</ItemActions>
					</Item>
				)}

				<Separator/>
			</FadeSection>

			{/* Sections */}
			<FadeSection className="*:mt-16">
				{articles.map((article, idx) => <Article
					key={idx}
					{...article}
				/>)}
			</FadeSection>
		</div>
	);
}
