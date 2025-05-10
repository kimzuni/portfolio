import { useState, useEffect } from "react";

import { useMergedRefs, useVisibility, useIsInViewport, UseVisibilityOptions } from "../hooks";



export type SectionProps = React.ComponentPropsWithoutRef<"section">;
export interface DivProps extends React.ComponentPropsWithoutRef<"div">, Omit<UseVisibilityOptions, "collapseOnHide" | "showTransition" | "hideTransition"> {
};

const Component = ({
	className="",
	...props
}: SectionProps) => {
	return (
		<section
			className={`${className} px-6`.trim()}
			{...props}
		/>
	);
};

const Animation = ({
	delay,
	duration="1000ms",
	timingFunction,
	translateValue,
	...props
}: DivProps) => {
	const [isVisibility, setIsVisibility] = useState(false);
	const [ref1, isInViewport] = useIsInViewport<HTMLDivElement>();
	const ref2 = useVisibility<HTMLDivElement>(isVisibility, { delay, duration, timingFunction, translateValue, hideTransition: false });

	const ref = useMergedRefs(ref1, ref2);

	useEffect(() => {
		setIsVisibility(isInViewport);
	}, [isInViewport]);

	return (
		<div
			ref={ref}
			{...props}
		/>
	);
};

const Section = {
	Component,
	Animation,
};

export default Section;
