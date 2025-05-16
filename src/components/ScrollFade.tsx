import { forwardRef, useState, useEffect } from "react";

import { useMergedRefs, useAnimateInView, useIsInViewport, UseAnimateInViewOptions } from "../hooks";



export interface DivProps extends React.ComponentPropsWithoutRef<"div">, Omit<UseAnimateInViewOptions, "collapseOnHide" | "showTransition" | "hideTransition"> {
};



const ScrollFade = forwardRef<HTMLDivElement, DivProps>(({
	delay,
	duration="1000ms",
	timingFunction,
	translateValue,
	...props
}, propsRef) => {
	const [isVisibility, setIsVisibility] = useState(false);
	const [ref1, isInViewport] = useIsInViewport<HTMLDivElement>();
	const ref2 = useAnimateInView<HTMLDivElement>(isVisibility, { delay, duration, timingFunction, translateValue, hideTransition: false });

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

export default ScrollFade;
