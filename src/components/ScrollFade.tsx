import { forwardRef } from "react";

import { useMergedRefs, useAnimateInView, useIsInViewport, UseAnimateInViewOptions } from "../hooks";



export interface DivProps extends React.ComponentPropsWithoutRef<"div">, Omit<UseAnimateInViewOptions, "collapseOnHide" | "showTransition" | "hideTransition"> {
};



const ScrollFade = forwardRef<HTMLDivElement, DivProps>(({
	delay,
	duration="1000ms",
	timingFunction,
	translateValue,
	style={},
	...props
}, propsRef) => {
	const [ref1, isInViewport] = useIsInViewport<HTMLDivElement>();
	const ref2 = useAnimateInView<HTMLDivElement>(isInViewport, { delay, duration, timingFunction, translateValue, hideTransition: false });

	const ref = useMergedRefs(ref1, ref2, propsRef);

	return (
		<div
			ref={ref}
			style={{
				opacity: 0,
				...style,
			}}
			{...props}
		/>
	);
});

export default ScrollFade;
