import { ScrollFade, Icons } from "../../components";
import { useIsInViewport } from "../../hooks";

import Section, { SectionProps } from "./Section";



export interface IntroItem {
	title: string;
	subtitle: string;
	description: React.ReactElement;
}

export interface IntroProps extends SectionProps {
	item: IntroItem;
}

export default function Intro({
	item,
	className="",
	...props
}: IntroProps) {
	const [ref, isInViewport] = useIsInViewport<HTMLDivElement>();

	return (
		<Section
			id="intro"
			className={`
				${className}
				pb-[calc(100lvh-100svh+64px)]!
				bg-theme-bg-dark text-theme-text-light
				flex flex-col justify-center items-center
				font-extrabold text-center
				text-3xl md:text-4xl

				[&>*]:w-full [&>*]:max-w-160
			`.replace(/\s+/g, " ").trim()}
			{...props}
		>
			<ScrollFade
				className={`
					pt-24
					flex-1 flex flex-col justify-center items-center gap-6

					[&_.gradient]:text-linear-to-r
					[&_.gradient]:from-theme-primary [&_.gradient]:to-green-500
				`.replace(/\s+/g, " ").trim()}
			>
				<h2
					className="gradient text-[1.25em]"
					children={item.title}
				/>
				<p
					className="gradient"
					children={item.subtitle}
				/>
				<p
					className="pt-4 text-xl text-center leading-8"
					children={item.description}
				/>
			</ScrollFade>
			<ScrollFade
				ref={ref}
				className={`
					py-8
					flex flex-col justify-center items-center gap-2
					text-theme-text-light-sub/50 text-sm
				`.replace(/\s+/g, " ").trim()}
			>
				<Icons.Scroll
					size="36"
					className="p-1 animate-bounce"
					style={{
						animationPlayState: isInViewport ? "running" : "paused",
					}}
				/>
				<span>Scroll Down</span>
			</ScrollFade>
		</Section>
	);
}
