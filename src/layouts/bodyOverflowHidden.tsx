import { strToMs } from "../utils";

export interface bodyOverflowHiddenOptions {
	delay?: React.CSSProperties["transitionDelay"];
	showDelay?: React.CSSProperties["transitionDelay"];
	hideDelay?: React.CSSProperties["transitionDelay"];
}

export default function bodyOverflowHidden(hidden: boolean, { delay, showDelay, hideDelay }: bodyOverflowHiddenOptions = {}): undefined | number {
	const scrollWidth = window.innerWidth - document.body.clientWidth;
	const px = `${scrollWidth}px`;
	const body = document.body;

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
