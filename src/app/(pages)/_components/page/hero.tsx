import { cn } from "@/lib/utils";

import { LinkButton } from "@/components/link-button";
import { MarkdownBox } from "@/components/markdown-box";

import { Section, type SectionProps } from "./section";

import type * as contents from "@/contents";



export interface HeroProps extends SectionProps, contents.home.Hero {
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
		<>
			<div
				id="hero-background"
				className={cn(
					"absolute right-0 top-0 w-svw h-svh -z-1",
					"from-primary/15 dark:from-primary/10 via-transparent to-transparent",
					"bg-linear-to-b dark:bg-linear-to-br",
				)}
			/>
			<Section {...props}>
				<div className="flex flex-col gap-4 justify-center text-center">
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight w-fit mx-auto bg-linear-to-r bg-clip-text text-transparent from-primary to-green-500/60">
						{heading}
					</h1>
					<p className="font-mono font-semibold text-xl md:text-2xl">
						{subheading}
					</p>
					<MarkdownBox
						source={tagline}
						className="pt-4 font-medium md:text-lg max-w-2xl mx-auto leading-relaxed *:m-0"
					/>
					<div className="empty:hidden flex flex-wrap items-center justify-center gap-4 pt-8">
						{buttons?.map(button => <LinkButton key={button.label} {...button}/>)}
					</div>
				</div>

				{children}
			</Section>
		</>
	);
}
