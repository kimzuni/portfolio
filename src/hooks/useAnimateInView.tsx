import { useRef, useEffect } from "react";



export interface UseAnimateInViewOptions {
	delay?: React.CSSProperties["transitionDelay"];
	duration?: React.CSSProperties["transitionDuration"];
	timingFunction?: React.CSSProperties["transitionTimingFunction"];
	translateValue?: React.CSSProperties["translate"];
	collapseOnHide?: boolean;
	showTransition?: boolean;
	hideTransition?: boolean;
}

const getCSSVar = (name: `--${string}`) => getComputedStyle(document.documentElement).getPropertyValue(name);
const defaultDelay = getCSSVar("--default-transition-delay");
const defaultDuration = getCSSVar("--default-transition-duration");
const defaultTiming = getCSSVar("--default-transition-timing-function");

const strToMs = (string: React.CSSProperties["transitionDuration"]) => {
	if (!string) return strToMs(defaultDuration);
	if (string.endsWith("ms")) return parseFloat(string);
	if (string.endsWith("s")) return parseFloat(string) * 1000;
	return Number(string);
};

export default function useAnimateInView<E extends HTMLElement = HTMLElement>(isVisible: boolean, options?: UseAnimateInViewOptions) {
	const ref = useRef<E>(null);
	const timer = useRef(0);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const {
			delay=defaultDelay,
			duration=defaultDuration,
			timingFunction=defaultTiming,
			translateValue="0px -20px",
			collapseOnHide=false,
			showTransition=true,
			hideTransition=true,
		} = options ?? {};

		if (collapseOnHide) {
			if (isVisible) {
				node.style.display = "";
			} else {
				clearTimeout(timer.current);
				timer.current = setTimeout(() => {
					node.style.display = "none";
				}, strToMs(duration));
			}
		}

		const immediate = (isVisible && !showTransition) || (!isVisible && !hideTransition);
		setTimeout(() => {
			node.style.opacity = `${isVisible ? 1 : 0}`;
			node.style.translate = isVisible ? "0px" : `${translateValue}`;
			node.style.transitionProperty = `opacity, translate`;
			node.style.transitionDelay = immediate ? "0ms" : delay;
			node.style.transitionDuration = immediate ? "0ms" : duration;
			node.style.transitionTimingFunction = timingFunction;
		}, 0);

		return () => {
			clearTimeout(timer.current);
		};
	}, [isVisible, options]);

	return ref;
}
