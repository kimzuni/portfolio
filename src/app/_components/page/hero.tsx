import type { MarkdownValue } from "@/lib/utils";
import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { MarkdownBox } from "@/components/markdown-box";
import { Fade } from "@/components/fade";

import { Section, type SectionProps } from "./section";



export interface HomeHeroData {
	heading: string;
	subheading: string;
	tagline: MarkdownValue;
	buttons?: LinkButtonProps[];
}

export interface HeroProps extends SectionProps, HomeHeroData {
}

export function Hero({
	heading,
	subheading,
	tagline,
	buttons,
	children,
	...props
}: HeroProps) {
	return (
		<Fade asChild>
			<Section {...props}>
				<div className="flex-1 flex flex-col gap-4 justify-center text-center">
					<h1
						className="text-4xl md:text-6xl font-extrabold tracking-tight w-fit mx-auto bg-linear-to-r bg-clip-text text-transparent from-primary to-green-500/60"
						children={heading}
					/>
					<p
						className="font-mono font-semibold text-xl md:text-2xl"
						children={subheading}
					/>
					<MarkdownBox
						source={tagline}
						className="pt-4 font-medium md:text-lg max-w-2xl mx-auto leading-relaxed"
					/>
					<div className="empty:hidden flex flex-wrap items-center justify-center gap-4 pt-8">
						{buttons?.map(button => <LinkButton key={button.label} {...button}/>)}
					</div>
				</div>
				{children}
			</Section>
		</Fade>
	);
}
