import * as seo from "@/lib/seo";
import * as format from "@/lib/format";

import { FadeSection } from "@/components/fade";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Time } from "@/components/time";
import { Badge } from "@/components/ui/badge";
import { PageBadge } from "@/components/page-badge";
import { Heading as BaseHeading } from "@/components/heading";
import { MarkdownBox } from "@/components/markdown-box";

import { Philosophies } from "./_components/philosophies";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.about.metadata);



function Heading(props: {
	children: React.ReactNode;
}) {
	return (
		<BaseHeading
			level={2}
			className="mb-12 border-l-4 border-primary pl-4 font-mono"
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
							<CardDescription>{format.date(date)}</CardDescription>
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

export default function About() {
	const data = contents.about.item;

	return (
		<div className="space-y-32">
			{/* Intro Section */}
			<FadeSection className="space-y-8 max-w-3xl">
				<header>
					<PageBadge
						className="mb-4"
						label={data.label}
					/>
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter break-keep">
						<span className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
							{data.title}
						</span>
					</h1>
				</header>
				<MarkdownBox
					className="prose-xl"
					source={data.introduction.lines}
				/>
			</FadeSection>

			{/* Philosophies Section */}
			<FadeSection>
				<Heading>Values</Heading>
				<Philosophies
					items={data.philosophies}
				/>
			</FadeSection>

			<div className="grid md:grid-cols-2 gap-16 md:gap-24">
				{/* Left Column, Education */}
				<FadeSection className="space-y-6">
					<Heading>Education</Heading>
					{data.educations.map(edu => (
						<article key={`${edu.school}/${edu.major}`}>
							<Card className="gap-1">
								<CardHeader className="flex justify-between items-start">
									<CardTitle className="text-lg font-bold">{edu.school}</CardTitle>
									<Badge variant="outline">{edu.status}</Badge>
								</CardHeader>
								<CardContent>
									<CardDescription className="font-medium">{edu.major}</CardDescription>
								</CardContent>
								<CardFooter>
									<CardDescription>
										<Time date={edu.period[0]}/>
										{" ~ "}
										{edu.period[1] ? <Time date={edu.period[1]}/> : "Present"}
									</CardDescription>
								</CardFooter>
							</Card>
						</article>
					))}
				</FadeSection>

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
