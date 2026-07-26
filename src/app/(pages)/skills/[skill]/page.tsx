import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";

import { Separator } from "@/components/ui/separator";
import { FadeHeader, FadeSection, FadeArticle } from "@/components/fade";
import { SkillIcon } from "@/components/skill-icon";
import { SkillLevelProvider, SkillLevelBadge } from "@/components/skill-level";
import { ProjectCarousel } from "@/pages/_components/page/projects";
import { ContributionCarousel } from "@/pages/_components/page/contributions";
import { Category } from "@/components/skill-box";
import { PageBadge } from "@/components/page-badge";
import { ContentBox } from "@/components/content-box";
import { Heading } from "@/components/heading";
import { Tabs, TabsProps, TabsContent } from "@/components/filter";

import * as contents from "@/contents";



export type Props = PageProps<"/skills/[skill]">;



async function getSkillOrNotFound({ params }: Props) {
	const { skill } = await params;
	const slug = decodeURIComponent(skill);
	if (!contents.skill.has(slug)) {
		return notFound();
	}
	return contents.skill.get(slug)!;
}



export async function generateMetadata(props: Props) {
	const data = await getSkillOrNotFound(props);
	return seo.createMetadata({
		title: `${data.label} - Skills`,
		description: data.description.lines,
	})
}




interface ArticleProps extends React.ComponentProps<typeof FadeArticle> {
	label: string;
	children: React.ReactNode;
}

function Article({
	label,
	children,
	...props
}: ArticleProps) {
	return (
		<FadeArticle
			once={false}
			data-article={label.toLowerCase()}
			{...props}
		>
			<Heading level={2} className="mt-2 mb-4 text-2xl font-bold tracking-tight">
				{label}
			</Heading>

			{children}
		</FadeArticle>
	);
}



interface NoArticleItemProps extends Omit<React.ComponentProps<"p">, "children"> {
	message: string;
}

function NoArticleItem({
	message,
	className,
	...props
}: NoArticleItemProps) {
	return (
		<p
			className={cn(
				"text-muted-foreground font-medium",
				className,
			)}
			{...props}
		>{message}</p>
	);
}



export default async function Skill(props: Props) {
	const {
		label,
		group,
		category,
		level,
		description,
		icon,
		provider,
		projects: { all: projects },
		contributions: { all: contributions },
	} = await getSkillOrNotFound(props);

	const tabs: TabsProps["items"] = [
		{
			slug: "projects",
			label: `Projects (${projects.length})`,
		},
		{
			slug: "contributions",
			label: `Contributions (${contributions.length})`,
		},
	];

	return (
		<SkillLevelProvider color={level.color} className="space-y-8">
			{/* Header */}
			<FadeHeader className="space-y-6 max-w-3xl">
				<div className="flex flex-wrap items-center gap-3">
					<PageBadge label="Skill Detail"/>
					<SkillLevelBadge label={level.label}/>
				</div>

				<div className="flex items-center-safe gap-6">
					<div className="p-2">
						<SkillIcon
							icon={icon}
							label={label}
							level={level.label}
							provider={provider}
							width={64}
							height={64}
						/>
					</div>

					<div className="space-y-1.5">
						<Heading level={1} className="font-extrabold">
							{label}
						</Heading>
						<Category
							group={group.label}
							category={category.label}
							className="text-sm font-semibold text-muted-foreground"
						/>
					</div>
				</div>

				<ContentBox className="px-2 text-base leading-relaxed empty:hidden">
					{description.result}
				</ContentBox>
			</FadeHeader>

			<FadeSection>
				<Tabs
					className="gap-0"
					variant="line"
					items={tabs}
				>
					<Separator className="mb-4"/>

					<TabsContent value={tabs[0]}>
						<Article label="Related Projects">
							<ProjectCarousel
								items={projects}
								fallback={<NoArticleItem message="이 스킬과 연관된 프로젝트가 없습니다."/>}
							/>
						</Article>
					</TabsContent>

					<TabsContent value={tabs[1]}>
						<Article label="Related Contributions">
							<ContributionCarousel
								items={contributions}
								fallback={<NoArticleItem message="이 스킬과 연관된 오픈소스 기여 내역이 없습니다."/>}
							/>
						</Article>
					</TabsContent>
				</Tabs>
			</FadeSection>
		</SkillLevelProvider>
	);
}
