import { cn, type MarkdownValue } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { Heading } from "@/components/heading";
import { Message } from "@/components/message";
import { Fade } from "@/components/fade";

import type { ProjectData } from "../../projects/[slug]/page";
import { ProjectBox } from "../../projects/_components/project-box";
import { Section, type SectionProps } from "./section";



export interface HomeProjectsData {
	heading: string;
	message: MarkdownValue;
	linkButton: LinkButtonProps;
	items: Array<ProjectData & {
		pin?: boolean;
	}>;
}

export interface ProjectsProps extends Omit<SectionProps, "children">, HomeProjectsData {
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
			<Fade className="space-y-6">
				<div className="flex items-center justify-between gap-2">
					<Heading
						level={2}
						children={heading}
					/>
					<LinkButton
						href="/projects/"
						{...linkButton}
					/>
				</div>

				<Message
					source={message}
				/>
			</Fade>

			<Fade asChild>
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
			</Fade>
		</Section>
	);
}
