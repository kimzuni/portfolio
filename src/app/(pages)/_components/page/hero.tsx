import { AnchorButton } from "@/components/anchor-button";
import { ContentBox } from "@/components/content-box";

import { Section, type SectionProps } from "./section";

import type * as contents from "@/contents";



export interface HeroProps extends SectionProps, contents.home.Hero {
	children?: React.ReactNode;
}

export function Hero({
	heading,
	subheading,
	tagline,
	anchorButton,
	children,
	...props
}: HeroProps) {
	return (
		<Section {...props}>
			<div className="flex flex-col gap-4 justify-center text-center">
				<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight w-fit mx-auto bg-linear-to-r bg-clip-text text-transparent from-primary to-green-500/60">
					{heading}
				</h1>
				<p className="font-mono font-semibold text-xl md:text-2xl">
					{subheading}
				</p>
				<ContentBox className="pt-4 font-medium md:text-lg max-w-2xl mx-auto leading-relaxed *:m-0">
					{tagline.result}
				</ContentBox>
				<div className="empty:hidden flex flex-wrap items-center justify-center gap-4 pt-8">
					<AnchorButton
						{...anchorButton}
					/>
				</div>
			</div>

			{children}
		</Section>
	);
}
