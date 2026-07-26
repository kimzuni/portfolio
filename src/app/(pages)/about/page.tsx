import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";
import * as markdown from "@/lib/markdown";

import { FadeHeader, FadeSection, FadeArticle } from "@/components/fade";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { PeriodBox, type Period } from "@/components/period-box";
import { Badge } from "@/components/ui/badge";
import { PageBadge } from "@/components/page-badge";
import { Icon } from "@/components/icon";
import { Link } from "@/components/link";
import { Heading as BaseHeading, type HeadingProps as BaseHeadingProps } from "@/components/heading";
import { ContentBox } from "@/components/content-box";

import { Features } from "./_components/features";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.about.metadata);



interface HeadingProps extends BaseHeadingProps {
}

function Heading({
	level = 2,
	className,
	...props
}: HeadingProps) {
	return (
		<BaseHeading
			level={level}
			className={cn(
				"mb-6 border-l-4 border-primary pl-4 font-mono",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * for Certifications, Awards, Training
 */
function CardBox({
	heading,
	items,
}: {
	heading: string;
	items: Array<{
		period: Period<Date>;
		title: string;
		issuer: string;
		description?: markdown.Result;
		link?: string;
		rank?: string;
	}>;
}) {
	return (
		<FadeArticle className="space-y-6">
			<Heading className="mb-8">{heading}</Heading>
			{items.map(({ title, period, issuer, description, link, rank }) => (
				<article key={title} className="relative">
					{rank && (
						<Badge variant="secondary" className="absolute -top-2.5 left-2 text-sm p-2.5">{rank}</Badge>
					)}
					<Card className="flex-row items-center-safe gap-0">
						<CardContent className="flex-1 space-y-2">
							<CardTitle className="text-lg font-bold">
								{
									!link ? title : (
										<Link href={link} className="w-fit flex items-center gap-1.5 hover:text-primary underline underline-offset-2">
											<span className="flex-1">{title}</span>
											<Icon icon="BadgeCheck" size={14} className="text-primary -translate-y-0.5"/>
										</Link>
									)
								}
							</CardTitle>
							<CardDescription>
								<ContentBox className="mb-2 text-sm empty:hidden">
									{description?.result}
								</ContentBox>
								<PeriodBox period={period}/>
							</CardDescription>
						</CardContent>
						<CardFooter className="border-l border-primary rounded-none pl-2 w-28">
							<CardDescription className="w-full font-medium text-end py-1">
								{issuer}
							</CardDescription>
						</CardFooter>
					</Card>
				</article>
			))}
		</FadeArticle>
	);
}

/**
 * for Educations
 */
function EducationsBox({
	heading,
	items,
}: {
	heading: string;
	items: contents.about.Education[];
}) {
	return (
		<FadeArticle className="space-y-6">
			<Heading className="mb-8">{heading}</Heading>
			{items.map(({ school, major, degree, status, type, gpa, period }) => (
				<article key={`${school}/${major}`} className="relative">
					{degree && (
						<Badge variant="secondary" className="absolute -top-2.5 left-2 text-sm p-2.5">{degree}</Badge>
					)}
					<Card className="gap-1">
						<CardHeader className="flex justify-between items-start">
							<CardTitle>
								<span className="text-lg font-bold">{school}</span>
								{type && (
									<span className="text-sm"> ({type})</span>
								)}
							</CardTitle>
							<Badge variant="secondary">{status}</Badge>
						</CardHeader>
						<CardContent>
							<CardDescription>
								<span className="text-base font-medium">{major}</span>
								{gpa && (
									<span className="text-sm"> ({gpa.value}/{gpa.scale})</span>
								)}
							</CardDescription>
						</CardContent>
						<CardFooter>
							<CardDescription>
								<PeriodBox period={period}/>
							</CardDescription>
						</CardFooter>
					</Card>
				</article>
			))}
		</FadeArticle>
	);
}

export default function About() {
	const data = contents.about.item;

	return (
		<div className="space-y-32">
			{/* Intro Section */}
			<FadeHeader className="space-y-8 max-w-3xl">
				<div>
					<PageBadge
						className="mb-4"
						label={data.label}
					/>
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter break-keep">
						<span className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
							{data.title}
						</span>
					</h1>
				</div>
				<ContentBox className="prose-lg">
					{data.introduction.result}
				</ContentBox>
			</FadeHeader>

			{/* Features Section */}
			<FadeSection>
				<Heading className="mb-12">Features</Heading>
				<Features
					items={data.features}
				/>
			</FadeSection>

			<section className="grid gap-16 md:grid-cols-2">
				{/* Education */}
				<EducationsBox
					heading="Education"
					items={data.educations}
				/>

				{/* Certifications */}
				<CardBox
					heading="Certifications"
					items={data.certifications.map(item => ({
						...item,
						period: [item.date, item.date],
					}))}
				/>

				{/* Awards */}
				<CardBox
					heading="Awards"
					items={data.awards.map(item => ({
						...item,
						period: [item.date, item.date],
						rank: typeof item.rank === "number" ? `${item.rank}위` : item.rank,
					}))}
				/>

				{/* Training */}
				<CardBox
					heading="Training"
					items={data.training.map(item => ({
						...item,
					}))}
				/>
			</section>
		</div>
	);
}
