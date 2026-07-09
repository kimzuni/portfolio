import { cn } from "@/lib/utils";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { LinkButton } from "@/components/link-button";
import { Heading } from "@/components/heading";
import { ProjectBox } from "@/components/project-box";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";

import type * as contents from "@/contents";



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

			<Carousel
				className="mx-12 *:px-2"
				opts={{
					align: "start",
					dragFree: true,
				}}
			>
				<CarouselContent className="py-2 items-stretch">
					{items.filter(x => x.pin).map(project => <CarouselItem key={project.slug} className="basis-auto flex">
						<ProjectBox className="select-none" {...project}/>
					</CarouselItem>)}
				</CarouselContent>
				<CarouselPrevious/>
				<CarouselNext/>
			</Carousel>
		</Section>
	);
}
