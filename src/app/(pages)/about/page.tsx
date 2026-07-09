import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";

import { FadeHeader, FadeSection } from "@/components/fade";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Time } from "@/components/time";
import { PeriodBox } from "@/components/period-box";
import { Badge } from "@/components/ui/badge";
import { PageBadge } from "@/components/page-badge";
import { Heading as BaseHeading, type HeadingProps as BaseHeadingProps } from "@/components/heading";
import { MarkdownBox } from "@/components/markdown-box";

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
				"mb-12 border-l-4 border-primary pl-4 font-mono",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * for Certificates and Awards
 */
function CertAndAwardsSection({
	heading,
	items,
}: {
	heading: string;
	items: Array<{
		date: Date;
		title: string;
		label: string;
	}>;
}) {
	return (
		<FadeSection className="space-y-4">
			<Heading>{heading}</Heading>
			{items.map(({ title, date, label }) => (
				<article key={title}>
					<Card className="flex-row items-center-safe gap-0">
						<CardContent className="flex-1 space-y-2">
							<CardTitle>{title}</CardTitle>
							<CardDescription>
								<Time value={date}/>
							</CardDescription>
						</CardContent>
						<CardFooter className="border-l border-primary rounded-none pl-2 max-w-28">
							<CardDescription className="font-medium text-end">
								{label}
							</CardDescription>
						</CardFooter>
					</Card>
				</article>
			))}
		</FadeSection>
	);
}

/**
 * for Educations
 */
function EducationsSection({
	heading,
	items,
}: {
	heading: string;
	items: contents.about.Education[];
}) {
	return (
		<FadeSection className="space-y-6">
			<Heading>{heading}</Heading>
			{items.map(({ school, major, status, period }) => (
				<article key={`${school}/${major}`}>
					<Card className="gap-1">
						<CardHeader className="flex justify-between items-start">
							<CardTitle className="text-lg font-bold">{school}</CardTitle>
							<Badge variant="outline">{status}</Badge>
						</CardHeader>
						<CardContent>
							<CardDescription className="font-medium">{major}</CardDescription>
						</CardContent>
						<CardFooter>
							<CardDescription>
								<PeriodBox period={period}/>
							</CardDescription>
						</CardFooter>
					</Card>
				</article>
			))}
		</FadeSection>
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
				<MarkdownBox
					className="prose-xl"
					source={data.introduction.lines}
				/>
			</FadeHeader>

			{/* Features Section */}
			<FadeSection>
				<Heading>Features</Heading>
				<Features
					items={data.features}
				/>
			</FadeSection>

			<div className="grid md:grid-cols-2 gap-16 md:gap-24">
				{/* Left Column, Education */}
				<EducationsSection
					heading="Education"
					items={data.educations}
				/>

				{/* Right Column */}
				<div className="space-y-20">
					{/* Certificates */}
					<CertAndAwardsSection
						heading="Certificates"
						items={data.certificates.map(item => ({
							...item,
							label: item.issuer,
						}))}
					/>

					{/* Awards */}
					<CertAndAwardsSection
						heading="Awards"
						items={data.awards.map(item => ({
							...item,
							label: typeof item.rank === "number" ? `${item.rank}위` : item.rank,
						}))}
					/>
				</div>
			</div>
		</div>
	);
}
