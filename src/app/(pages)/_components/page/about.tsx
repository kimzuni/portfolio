import { Features } from "@/pages/about/_components/features";

import { LinkButton } from "@/components/link-button";
import { Heading } from "@/components/heading";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";

import type * as contents from "@/contents";



export interface AboutProps extends Omit<SectionProps, "children" | "title">, contents.home.About {
}

export function About({
	heading,
	message,
	features,
	certificates,
	awards,
	linkButton,
	...props
}: AboutProps) {
	return (
		<Section {...props}>
			<div className="text-center space-y-8 pb-8">
				<Message>{message}</Message>
				<Heading level={2}>
					{heading}
				</Heading>
			</div>

			<Features items={features}/>

			<div className="flex justify-center items-end gap-8 md:gap-16">
				{
					Object.entries({ certificates, awards }).map(([key, value], i) => (
						<div
							key={key}
							className="flex flex-col items-center gap-1 font-mono"
							style={{ transitionDelay: `${i * 100}ms` }}
						>
							<span className="text-3xl md:text-4xl font-bold">{value}</span>
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{key}</span>
						</div>
					))
				}
			</div>

			<div className="mx-auto">
				<LinkButton href="/about" {...linkButton}/>
			</div>
		</Section>
	);
}
