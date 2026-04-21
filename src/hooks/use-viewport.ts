import { useMemo, useState, useEffect } from "react";



export interface UseIsInViewportOptions extends IntersectionObserverInit {
	once?: boolean;
}

export function useIsInViewport<E extends HTMLElement>(
	ref: React.RefObject<E | null>,
	{
		once,
		root,
		rootMargin,
		threshold: thresholdOption,
	}: UseIsInViewportOptions = {},
) {
	const [isInViewport, setIsInViewport] = useState(false);

	const threshold = useMemo(() => {
		if (typeof thresholdOption === "number") {
			return [thresholdOption];
		}

		const fallback = [0.01, 0.15] as const;
		if (!thresholdOption || thresholdOption.length === 0) {
			return [...fallback];
		}

		return [...thresholdOption].sort((a, b) => a - b);
	}, [thresholdOption]);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(([entry]) => {
			const { intersectionRatio, isIntersecting } = entry;
			const minThreshold = threshold[0] ?? 0;
			const maxThreshold = threshold.at(-1) ?? minThreshold;

			if (intersectionRatio <= minThreshold) {
				setIsInViewport(false);
				return;
			}

			if (intersectionRatio >= maxThreshold) {
				setIsInViewport(true);
				if (once) {
					observer.disconnect();
				}
				return;
			}

			setIsInViewport(prev => prev || isIntersecting);
		}, {
			root: root,
			rootMargin: rootMargin,
			threshold,
		});

		observer.observe(node);
		return () => observer.disconnect();
	}, [
		ref,
		threshold,
		root,
		rootMargin,
		once,
	]);

	return isInViewport;
}



export interface UseViewportFadeOptions extends UseIsInViewportOptions {
	durationMs?: number;
	easing?: React.CSSProperties["transitionTimingFunction"];
	direction?: "up" | "down";
	distancePx?: number;
	hiddenOpacity?: number;
	visibleOpacity?: number;
}

export function useViewportFade<E extends HTMLElement>(
	ref: React.RefObject<E | null>,
	{
		durationMs = 1000,
		easing,
		direction = "up",
		distancePx = 20,
		hiddenOpacity = 0,
		visibleOpacity = 1,
		...options
	}: UseViewportFadeOptions = {},
) {
	const isInViewport = useIsInViewport(ref, options);
	const hiddenTranslateY = direction === "up" ? distancePx : -distancePx;

	const style = useMemo<React.CSSProperties>(() => {
		return {
			opacity: isInViewport ? visibleOpacity : hiddenOpacity,
			translate: `0px ${isInViewport ? 0 : hiddenTranslateY}px`,
			willChange: "opacity, translate",
			transitionProperty: "opacity, translate",
			transitionDuration: `${durationMs}ms`,
			transitionTimingFunction: easing ?? "var(--default-transition-timing-function)",
		};
	}, [
		isInViewport,
		visibleOpacity,
		hiddenOpacity,
		hiddenTranslateY,
		durationMs,
		easing,
	]);

	return { style, isInViewport };
}
