import { forwardRef, useState, useEffect } from "react";

import { useMergedRefs, useVisibility, useIsInViewport, UseVisibilityOptions } from "../hooks";



export type SectionProps = React.ComponentPropsWithoutRef<"section">;
export interface DivProps extends React.ComponentPropsWithoutRef<"div">, Omit<UseVisibilityOptions, "collapseOnHide" | "showTransition" | "hideTransition"> {
};

const Section = ({
	className="",
	...props
}: SectionProps) => {
	return (
		<section
			className={`${className} px-6 pb-48 md:pb-64 [&_.title]:text-2xl [&_.title]:font-extrabold [&_.title]:mb-4 font-semibold`.trim()}
			{...props}
		/>
	);
};

const Animation = forwardRef<HTMLDivElement, DivProps>(({
	delay,
	duration="1000ms",
	timingFunction,
	translateValue,
	...props
}, propsRef) => {
	const [isVisibility, setIsVisibility] = useState(false);
	const [ref1, isInViewport] = useIsInViewport<HTMLDivElement>();
	const ref2 = useVisibility<HTMLDivElement>(isVisibility, { delay, duration, timingFunction, translateValue, hideTransition: false });

	const ref = useMergedRefs(ref1, ref2, propsRef);

	useEffect(() => {
		setIsVisibility(isInViewport);
	}, [isInViewport]);

	return (
		<div
			ref={ref}
			{...props}
		/>
	);
});

Section.Animation = Animation;

export default Section;
