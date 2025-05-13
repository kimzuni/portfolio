import { useState, useEffect } from "react";

import { useIsInViewport } from "../hooks";



export type ImgProps = React.ComponentPropsWithoutRef<"img">;

export default function Img({ loading="lazy", src, ...props }: ImgProps) {
	const isLazy = loading === "lazy";
	const [ref, isVisible] = useIsInViewport<HTMLImageElement>();
	const [isLoaded, setisLoaded] = useState(!isLazy);

	useEffect(() => {
		if (!isLazy || !isVisible) return;
		setisLoaded(true);
	}, [isLazy, isVisible]);

	return (
		<img
			ref={ref}
			src={isLazy !== true || isLoaded === true ? src : undefined}
			loading={loading}
			{...props}
		/>
	);
};
