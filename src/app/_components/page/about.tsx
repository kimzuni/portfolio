import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { Fade } from "@/components/fade";
import { Philosophy } from "@/app/about/_components/philosophy";
import type { AboutData } from "@/app/about/page";

import { Section, type SectionProps } from "./section";



export interface HomeAboutData extends Pick<AboutData, "philosophy"> {
	message: string;
	heading: string;
	certificates: number;
	awards: number;
	button: LinkButtonProps;
}

export interface AboutProps extends Omit<SectionProps, "children">, HomeAboutData {
}

export function About({
	heading,
	message,
	philosophy,
	certificates,
	awards,
	button,
	...props
}: AboutProps) {
	return (
		<Section {...props}>
			<Fade className="text-center space-y-8 pb-8">
				<p className="message font-bold">
					{message}
				</p>
				<h2 className="title">
					{heading}
				</h2>
			</Fade>

			<Philosophy items={philosophy}/>

			<Fade className="flex justify-center items-end gap-8 md:gap-16">
				{
					Object.entries({ certificates, awards }).map(([key, value], i) => (
						<Fade
							key={key}
							className="flex flex-col items-center gap-1 font-mono"
							style={{ transitionDelay: `${i * 100}ms` }}
						>
							<span className="text-3xl md:text-4xl font-bold">{value}</span>
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{key}</span>
						</Fade>
					))
				}
			</Fade>

			<Fade className="mx-auto">
				<LinkButton {...button}/>
			</Fade>
		</Section>
	);
}
