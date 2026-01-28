import type { Period } from "@/types";
import { formatDate } from "@/lib/utils";
import { createMetadata, type MetadataOptions } from "@/lib/seo";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageBadge } from "@/components/page-badge";
import { Fade } from "@/components/fade";
import { Time } from "@/components/time";
import { Philosophy, type PhilosophyItem } from "./_components/philosophy";

import { about } from "@/contents/about";



export const metadata = createMetadata(about.metadata);



export interface Introduction {
	heading: string;
	messages: string[];
}

export interface CertificateItem {
	date: Date;
	title: string;
	issuer: string;
}

export interface EducationItem {
	period: Period;
	school: string;
	major: string;
	status: "졸업" | "졸업 예정" | "수료";
}

export interface AwardItem {
	date: Date;
	title: string;
	rank: string;
}

export interface AboutData {
	label: string;
	metadata: MetadataOptions;
	introduction: Introduction;
	philosophy: PhilosophyItem[];
	education: EducationItem[];
	certificates: CertificateItem[];
	awards: AwardItem[];
}



function Heading({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<h2
			className="title mb-12 border-l-4 border-primary pl-4 font-mono"
			children={children}
		/>
	);
}



/**
 * for Certificates and Awards
 */
function ItemsSection({
	heading,
	items,
}: {
	heading: string;
	items: Array<{
		title: string;
		date: Date;
		label: string;
	}>;
}) {
	return (
		<section className="space-y-4">
			<Fade asChild>
				<Heading>{heading}</Heading>
			</Fade>
			{items.map(({ title, date, label }) => (
				<Fade key={title} asChild>
					<article>
						<Card className="flex-row items-center-safe gap-0">
							<CardContent className="flex-1 space-y-2">
								<CardTitle>{title}</CardTitle>
								<CardDescription>{formatDate(date)}</CardDescription>
							</CardContent>
							<CardFooter className="border-l border-primary pl-2 max-w-28">
								<CardDescription className="font-medium text-end">
									{label}
								</CardDescription>
							</CardFooter>
						</Card>
					</article>
				</Fade>
			))}
		</section>
	);
}



export default function About() {
	return (
		<div className="container space-y-32">
			{/* Intro Section */}
			<section className="space-y-8 max-w-3xl">
				<Fade asChild>
					<header>
						<PageBadge
							className="mb-4"
							label={about.label}
						/>
						<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter break-keep">
							<span className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
								{about.introduction.heading}
							</span>
						</h1>
					</header>
				</Fade>
				<Fade asChild>
					<div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
						{about.introduction.messages.map(msg => (
							<p key={msg}>{msg}</p>
						))}
					</div>
				</Fade>
			</section>

			{/* Philosophy Section */}
			<section>
				<Fade asChild>
					<Heading>Values</Heading>
				</Fade>
				<Philosophy
					items={about.philosophy}
				/>
			</section>

			<div className="grid md:grid-cols-2 gap-16 md:gap-24">
				{/* Left Column, Education */}
				<section className="space-y-6">
					<Fade asChild>
						<Heading>Education</Heading>
					</Fade>
					{about.education.map(edu => (
						<Fade key={`${edu.school}/${edu.major}`} asChild>
							<article>
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
						</Fade>
					))}
				</section>

				{/* Right Column */}
				<div className="space-y-20">
					{/* Certificates */}
					<ItemsSection
						heading="Certificates"
						items={about.certificates.map(item => ({
							...item,
							label: item.issuer,
						}))}
					/>

					{/* Awards */}
					<ItemsSection
						heading="Awards"
						items={about.awards.map(item => ({
							...item,
							label: item.rank,
						}))}
					/>
				</div>
			</div>
		</div>
	);
}
