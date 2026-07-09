import type { Transition } from "framer-motion";

import { Motion, type MotionProps, type TagName } from "@/components/motion";



export type FadeProps<T extends TagName = "div"> =
	& Omit<MotionProps<T>, "children" | "initial" | "whileInView" | "viewport" | "transition">
	& {
		children?: React.ReactNode;
		opacity?: number;
		x?: number;
		y?: number;
		once?: boolean;
		amount?: number;
		margin?: number;
		duration?: number;
		delay?: number;
		ease?: Transition["ease"];
	};

export function Fade<T extends TagName = "div">({
	once = true,
	x = 0,
	y = 20,
	opacity = 0,
	amount = 0.2,
	margin = 100,
	duration = 1,
	delay = 0,
	ease = "easeOut",
	...props
}: FadeProps<T>) {
	return (
		<Motion
			initial={{
				opacity,
				x, y,
			}}
			whileInView={{
				opacity: 1,
				x: 0,
				y: 0,
			}}
			viewport={{
				once,
				amount,
				margin: `${margin}px 0px ${margin}px 0px`,
			}}
			transition={{
				duration,
				delay,
				ease,
			}}
			{...props}
		/>
	);
}



export type FadeSectionProps = Omit<FadeProps<"section">, "tagName">;

export function FadeSection(props: FadeSectionProps) {
	return (
		<Fade tagName="section" {...props}/>
	);
}
