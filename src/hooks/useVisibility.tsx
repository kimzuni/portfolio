import { useCallback } from "react";



interface useVisibilityOptions {
	duration?: React.CSSProperties["transitionDuration"];
	timingFunction?: React.CSSProperties["transitionTimingFunction"];
	translate?: React.CSSProperties["translate"];
	hidden?: boolean;
}

const getCSSVar = (name: `--${string}`) => {
	return getComputedStyle(document.documentElement).getPropertyValue(name);
};

const defaultDuration = getCSSVar("--default-transition-duration");
const defaultTiming = getCSSVar("--default-transition-timing-function");

const strToMs = (string: React.CSSProperties["transitionDuration"]) => {
	if (!string) return strToMs(defaultDuration);
	if (string.endsWith("ms")) return parseFloat(string);
	if (string.endsWith("s")) return parseFloat(string) * 1000;
	return Number(string);
};

export default function useVisibility<E extends HTMLElement = HTMLElement>(isVisible: boolean, options: useVisibilityOptions = {}) {
	const duration = options.duration ?? defaultDuration;
	const timingFunction = options.timingFunction ?? defaultTiming;
	const translate = options.translate ?? "0px -20px";
	const hidden = options.hidden ?? false;

	const ms = strToMs(duration);
	const ref = useCallback((elem: E | null) => {
		if (!elem) return;
		if (hidden) {
			if (isVisible) {
				elem.style.display = "";
			} else {
				setTimeout(() => {
					elem.style.display = "none";
				}, ms);
			}
		}
		setTimeout(() => {
			elem.style.opacity = `${isVisible ? 1 : 0}`;
			elem.style.translate = isVisible ? "0px" : `${translate}`;
			elem.style.transitionProperty = `opacity, translate`;
			elem.style.transitionDuration = duration;
			elem.style.transitionTimingFunction = timingFunction;
		}, 0);
	}, [isVisible, duration, timingFunction, translate, hidden, ms]);

	return ref;
}
