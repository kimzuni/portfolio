import { useState, useEffect } from "react";

import { useIsInViewport } from "../hooks";



export interface ImgProps extends Omit<React.ComponentPropsWithoutRef<"img">, "loading"> {
	lazy?: boolean;
};

export default function Img({ lazy=true, src, ...props }: ImgProps) {
	const [ref, isVisible] = useIsInViewport<HTMLImageElement>();
	const [isLoaded, setisLoaded] = useState(!lazy);

	useEffect(() => {
		if (!lazy || !isVisible) return;
		setisLoaded(true);
	}, [lazy, isVisible]);

	return (
		<img
			ref={ref}
			src={lazy !== true || isLoaded === true ? src : undefined}
			loading={!lazy ? undefined : "lazy"}
			{...props}
		/>
	);
};
