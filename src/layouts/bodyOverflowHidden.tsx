import { strToMs } from "../utils";



export interface BodyOverflowHiddenOptions {
	delay?: React.CSSProperties["transitionDelay"];
	showDelay?: React.CSSProperties["transitionDelay"];
	hideDelay?: React.CSSProperties["transitionDelay"];
}

export default function bodyOverflowHidden(hidden: boolean, { delay, showDelay, hideDelay }: BodyOverflowHiddenOptions = {}): undefined | number {
	const body = document.body;
	const scrollWidth = window.innerWidth - body.clientWidth;
	const px = `${scrollWidth}px`;

	setTimeout(() => {
		body.style.overflow = hidden ? "hidden": "";
		body.style.paddingRight = hidden ? px: "";
		if (hidden) {
			body.style.setProperty("--body-hidden-scroll-width", px);
		} else {
			body.style.removeProperty("--body-hidden-scroll-width");
		}
	}, strToMs(delay ?? (hidden ? hideDelay : showDelay) ?? 0));

	return !hidden ? undefined : scrollWidth;
}
