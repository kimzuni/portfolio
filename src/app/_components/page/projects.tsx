import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { Fade } from "@/components/fade";

import type { ProjectData } from "../../projects/[slug]/page";
import { ProjectBox } from "../../projects/_components/project-box";
import { Section, type SectionProps } from "./section";



export interface HomeProjectsData {
	heading: string;
	message: string;
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
					<h2
						className="title"
						children={heading}
					/>
					<LinkButton
						href="/projects/"
						{...linkButton}
					/>
				</div>

				<p
					className="empty:hidden message"
					children={message}
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
							<ProjectBox {...project}/>
						</CarouselItem>)}
					</CarouselContent>
					<CarouselPrevious/>
					<CarouselNext/>
				</Carousel>
			</Fade>
		</Section>
	);
}
