import type { Transition } from "framer-motion";

import { Motion, type MotionProps, type TagName } from "@/components/motion";



export type FadeProps<T extends TagName = "div"> =
	& Omit<MotionProps<T>, "initial" | "whileInView" | "viewport" | "transition">
	& {
		x?: number;
		y?: number;
		once?: boolean;
		opacity?: number;
		amount?: number;
		margin?: number;
		duration?: number;
		delay?: number;
		ease?: Transition["ease"];
	};

export function Fade<T extends TagName = "div">({
	x = 0,
	y = 20,
	once = true,
	opacity = 0,
	amount = 0,
	margin = 100,
	duration = 1,
	delay = 0,
	ease = "easeOut",
	...props
}: FadeProps<T>) {
	const initialConfig = { opacity, x, y };
	const animateConfig = { opacity: 1, x: 0, y: 0 };
	const viewportConfig = { once, amount, margin: `${margin}px 0px ${margin}px 0px` };
	const transitionConfig = { duration, delay, ease };

	return (
		<Motion
			initial={initialConfig}
			whileInView={animateConfig}
			viewport={viewportConfig}
			transition={transitionConfig}
			{...props}
		/>
	);
}



export interface FadeHeaderProps extends Omit<FadeProps<"header">, "tagName"> {
}

export function FadeHeader(props: FadeHeaderProps) {
	return (
		<Fade tagName="header" {...props}/>
	);
}



export interface FadeSectionProps extends Omit<FadeProps<"section">, "tagName"> {
}

export function FadeSection(props: FadeSectionProps) {
	return (
		<Fade tagName="section" {...props}/>
	);
}



export interface FadeArticleProps extends Omit<FadeProps<"article">, "tagName"> {
}

export function FadeArticle(props: FadeArticleProps) {
	return (
		<Fade tagName="article" {...props}/>
	);
}
