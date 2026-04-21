import type { MarkdownValue } from "@/lib/utils";

import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { Heading } from "@/components/heading";
import { Message } from "@/components/message";
import { Fade } from "@/components/fade";
import { Philosophy } from "@/app/about/_components/philosophy";
import type { AboutData } from "@/app/about/page";

import { Section, type SectionProps } from "./section";



export interface HomeAboutData extends Pick<AboutData, "philosophy"> {
	message: MarkdownValue;
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
				<Message
					source={message}
				/>
				<Heading
					level={2}
					children={heading}
				/>
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
