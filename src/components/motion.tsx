"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";



type M = typeof motion;

export type TagName = keyof M & keyof React.JSX.IntrinsicElements;

export type MotionProps<T extends TagName = "div"> =
	& Omit<React.ComponentProps<M[T]>, "className">
	& {
		tagName?: T;
		className?: string;
	};

export function Motion<T extends TagName = "div">({
	tagName = "div" as T,
	className,
	...props
}: MotionProps<T>) {
	const Comp = motion[tagName];

	return (
		// @ts-expect-error: ts(2589)
		<Comp
			className={cn(
				"will-change-[opacity,transform]",
				className,
			)}
			{...props}
		/>
	);
}
