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

	const hasFigure = !!caption || !!alwaysWrap;

	return (
		<Figure
			caption={caption}
			captionPosition={captionPosition}
			alwaysWrap={alwaysWrap}
			className={hasFigure ? className : undefined}
		>
			{
				isSame
				? <BaseImage src={_lightSrc} className={hasFigure ? undefined : className} {...props}/>
				: <>
					<BaseImage
						src={_lightSrc}
						className={cn(
							"dark:hidden",
							!hasFigure && className,
						)}
						{...props}
					/>
					<BaseImage
						src={_darkSrc}
						className={cn(
							"not-dark:hidden",
							!hasFigure && className,
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

function VideoSource(props: React.ComponentProps<"source">) {
	const type = props.type ?? !props.src ? undefined : `video/${props.src.split(".").pop()}`;

	return (
		<source type={type} {...props}/>
	);
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
				preload="metadata"
				loop
				autoPlay
				muted
				playsInline
				controls
				{...props}
			>
				{sourceProps.map((props, idx) => (
					<VideoSource key={props.src ?? idx} {...props}/>
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
