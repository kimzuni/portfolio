import { useState, useEffect } from "react";
import { Picture } from "vite-imagetools";

import { useIsInViewport } from "../hooks";



const noImage = "data:image/svg+xml;base64," + btoa(`
	<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256">
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image :(</text>
	</svg>
`.replace(/\s+/g, " ").trim());



export type MediaType = "image" | "video";
export type VideoProps = React.ComponentPropsWithoutRef<"video">;
export type ImageProps = Omit<React.ComponentPropsWithoutRef<"img">, "src"> & {
	src?: string | Picture;
};

export type MediaProps<T extends MediaType> = { type?: T } & (T extends "image" ? ImageProps : VideoProps);



export default function Media<T extends MediaType = "image">({
	type="image" as T,
	// @ts-expect-error: ts(2339)
	loading="lazy", preload="none",
	src,
	className="",
	...props
}: MediaProps<T>) {
	const isLazy = (type === "image" && loading === "lazy") || (type === "video" && preload === "none");
	const [ref, isVisible] = useIsInViewport<HTMLElement>();
	const [isLoaded, setisLoaded] = useState(!isLazy);

	useEffect(() => {
		if (!isLazy || !isVisible) return;
		setisLoaded(true);
	}, [isLazy, isVisible]);

	if (type === "image") {
		const imageProps = props as Omit<ImageProps, "src" | "className" | "loading">;

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
					ref={ref as React.RefObject<HTMLImageElement | null>}
					src={src === undefined ? noImage : isLazy !== true || isLoaded === true ? (typeof src === "object" ? src.img.src : src) : undefined}
					alt={!src || typeof src !== "string" ? undefined : src.split("/").reverse()[0].split(".")[0]}
					loading={loading}
					{...imageProps}
				/>
			</picture>
		);
	} else {
		const videoProps = props as Omit<VideoProps, "src" | "className" | "preload">;

		return (
			<video
				className={`mx-auto ${className}`}
				ref={ref as React.RefObject<HTMLVideoElement | null>}
				src={isLazy !== true || isLoaded === true ? src as string | undefined : undefined}
				loop autoPlay muted playsInline
				preload={preload}
				{...videoProps}
			/>
		);
	}
}
