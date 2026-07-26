import { cn } from "@/lib/utils";

import { Carousel, CarouselItem } from "@/components/carousel";
import { LinkButton } from "@/components/link-button";
import { Heading } from "@/components/heading";
import { ProjectBox } from "@/components/project-box";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";

import type * as contents from "@/contents";



export interface ProjectCarouselProps {
	items: contents.project.Item[];
	fallback?: React.ReactNode;
}

export function ProjectCarousel({
	items,
	fallback,
}: ProjectCarouselProps) {
	if (!items.length) {
		return fallback ?? null;
	}

	return (
		<Carousel>
			{items.map(project => (
				<CarouselItem key={project.slug} className="basis-auto flex">
					<ProjectBox
						className="select-none"
						slug={project.slug}
						cover={project.cover}
						name={project.name}
						description={project.description.lines}
						period={project.period}
						tags={project.tags.map(tag => ({
							slug: tag.slug,
							label: tag.label,
						}))}
						skills={project.skills.primary.map(skill => ({
							slug: skill.slug,
							label: skill.label,
						}))}
						isTeam={!!project.team}
					/>
				</CarouselItem>
			))}
		</Carousel>
	);
}



export interface ProjectsProps extends Omit<SectionProps, "children">, contents.home.Projects {
}

export function Projects({
	heading,
	message,
	linkButton,
	items,
	className,
	...props
}: ProjectsProps) {
	return (
		<Section className={cn("@container", className)} {...props}>
			<div className="space-y-6">
				<div className="flex items-center justify-between gap-2">
					<Heading level={2}>
						{heading}
					</Heading>
					<LinkButton
						href="/projects/"
						{...linkButton}
					/>
				</div>

				<Message>
					{message}
				</Message>
			</div>

			<ProjectCarousel
				items={items}
			/>
		</Section>
	);
}
