import BaseImage from "next/image";
import type { ImageProps as BaseImageProps } from "next/image";

import { cn } from "@/lib/utils";
import { Figure, type FigureOption } from "@/components/figure";



export interface GenerateImageNoThemedMap<T> {
	src: T;
}

export interface GenerateImageThemedMap<T> {
	lightSrc: T;
	darkSrc: T;
}



export type ImageSRC = BaseImageProps["src"];

export type ImageNoThemedOptions = GenerateImageNoThemedMap<ImageSRC>;

export type ImageThemedOptions = GenerateImageThemedMap<ImageSRC>;

export interface ImageNoThemedProps extends BaseImageProps, FigureOption {
}

export interface ImageThemedProps extends Omit<BaseImageProps, "src">, ImageThemedOptions, FigureOption {
}

export type ImageProps = ImageNoThemedProps | ImageThemedProps;

export function Image({
	// @ts-expect-error: ts(2339)
	src, lightSrc, darkSrc,

	caption,
	captionPosition,
	alwaysWrap,

	className,
	...props
}: ImageProps) {
	const _lightSrc = (lightSrc ?? src) as ImageSRC;
	const _darkSrc = (darkSrc ?? src) as ImageSRC;
	const isSame = _lightSrc === _darkSrc;

	return (
		<Figure
			caption={caption}
			captionPosition={captionPosition}
			alwaysWrap={alwaysWrap}
		>
			{
				isSame
				? <BaseImage src={_lightSrc} className={className} {...props}/>
				: <>
					<BaseImage
						src={_lightSrc}
						className={cn(
							"dark:hidden",
							className,
						)}
						{...props}
					/>
					<BaseImage
						src={_darkSrc}
						className={cn(
							"not-dark:hidden",
							className,
						)}
						{...props}
					/>
				</>
			}
		</Figure>
	);
}



export interface VideoProps extends React.ComponentProps<"video">, FigureOption {
	sourceProps?: React.ComponentProps<"source"> | Array<React.ComponentProps<"source">>;
	trackProps?: React.ComponentProps<"track"> | Array<React.ComponentProps<"track">>;
}

export function Video({
	caption,
	captionPosition,
	alwaysWrap,
	sourceProps,
	trackProps,
	...props
}: VideoProps) {
	sourceProps = Array.isArray(sourceProps) ? sourceProps : sourceProps ? [sourceProps] : [];
	trackProps = Array.isArray(trackProps) ? trackProps : trackProps ? [trackProps] : [];

	return (
		<Figure
			caption={caption}
			captionPosition={captionPosition}
			alwaysWrap={alwaysWrap}
		>
			<video
				preload="none"
				loop
				autoPlay
				muted
				playsInline
				controls
				{...props}
			>
				{sourceProps.map((props, idx) => (
					<source key={props.src ?? idx} type="video/mp4" {...props}/>
				))}
				{trackProps.map((props, idx) => (
					<track key={props.src ?? idx} {...props}/>
				))}
				Your browser does not support the video tag.
			</video>
		</Figure>
	)
}



export type MediaType = MediaProps["type"];
export type MediaProps =
	| ImageProps & { type: "image" }
	| VideoProps & { type: "video" };

export function Media({
	type,
	...props
}: MediaProps) {
	return type !== "image"
		? (
			<Video
				{...props as VideoProps}
			/>
		)
		: (
			// eslint-disable-next-line jsx-a11y/alt-text
			<Image
				{...props as ImageProps}
			/>
		);
}
