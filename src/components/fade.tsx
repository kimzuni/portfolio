"use client";

import { useRef } from "react";
import { Slot, SlotProps } from "@radix-ui/react-slot";

import { useViewportFade, type UseViewportFadeOptions } from "@/hooks/use-viewport";



export interface FadeProps extends SlotProps, UseViewportFadeOptions {
	asChild?: boolean;
}

export function Fade({
	root,
	rootMargin,
	threshold,
	once,
	durationMs,
	easing,
	direction,
	distancePx,
	hiddenOpacity,
	visibleOpacity,

	asChild,
	style,
	...props
}: FadeProps) {
	const ref = useRef<HTMLDivElement>(null);
	const fade = useViewportFade(ref, {
		root,
		rootMargin,
		threshold,
		once,
		durationMs,
		easing,
		direction,
		distancePx,
		hiddenOpacity,
		visibleOpacity,
	});

	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			ref={ref}
			style={{
				...fade.style,
				...style,
			}}
			{...props}
		/>
	);
}
