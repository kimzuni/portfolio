import { useState, useEffect } from "react";
import { Picture } from "vite-imagetools";

import { useIsInViewport } from "../hooks";



const noImage = "data:image/svg+xml;base64," + btoa(`
	<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256">
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image :(</text>
	</svg>
`.replace(/\s+/g, " ").trim());

export interface ImgProps extends Omit<React.ComponentPropsWithoutRef<"img">, "src"> {
	src?: string | Picture;
}

export default function Img({
	loading="lazy",
	src,
	className="",
	...props
}: ImgProps) {
	const isLazy = loading === "lazy";
	const [ref, isVisible] = useIsInViewport<HTMLImageElement>();
	const [isLoaded, setisLoaded] = useState(!isLazy);

	useEffect(() => {
		if (!isLazy || !isVisible) return;
		setisLoaded(true);
	}, [isLazy, isVisible]);

	return (
		<picture>
			{typeof src === "object" && Object.entries(src.sources).map(([format, images]) =>
				<source
					key={images}
					srcSet={images}
					type={`image/${format}`}
				/>
			)}
			<img
				className={`mx-auto ${className}`}
				ref={ref}
				src={src === undefined ? noImage : isLazy !== true || isLoaded === true ? (typeof src === "object" ? src.img.src : src) : undefined}
				alt={!src || typeof src !== "string" ? undefined : src.split("/").reverse()[0].split(".")[0]}
				loading={loading}
				{...props}
			/>
		</picture>
	);
}
