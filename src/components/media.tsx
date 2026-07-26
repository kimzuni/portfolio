import BaseImage from "next/image";
import type { ImageProps as BaseImageProps } from "next/image";

import { cn } from "@/lib/utils";
import * as array from "@/lib/array";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Figure, type FigureOption } from "@/components/figure";



export interface GenerateImageNoThemedMap<T> {
	src: T;
}

export interface GenerateImageThemedMap<T> {
	lightSrc: T;
	darkSrc: T;
}

export interface CommonFigureOptions extends Omit<FigureOption, "caption"> {
	figureClassName?: string;
	caption?: string;
}



export type ImageSRC = BaseImageProps["src"];

export interface ImageCommonOptions extends CommonFigureOptions {
	/**
	 * 이미지 클릭 시 모달(라이트박스)로 확대하여 보여주는 기능 활성화 여부
	 */
	zoomable?: boolean;
}

export interface ImageNoThemedOptions extends GenerateImageNoThemedMap<ImageSRC> {
}

export interface ImageThemedOptions extends GenerateImageThemedMap<ImageSRC> {
}

export interface ImageNoThemedProps extends BaseImageProps, ImageCommonOptions {
}

export interface ImageThemedProps extends Omit<BaseImageProps, "src">, ImageThemedOptions, ImageCommonOptions {
}

export type ImageProps = ImageNoThemedProps | ImageThemedProps;

export function Image({
	// @ts-expect-error: ts(2339)
	src, lightSrc, darkSrc,

	caption,
	captionPosition,
	alwaysWrap,
	figureClassName,

	zoomable,

	className,
	...props
}: ImageProps) {
	const _lightSrc = (lightSrc ?? src) as ImageSRC;
	const _darkSrc = (darkSrc ?? src) as ImageSRC;
	const isSame = _lightSrc === _darkSrc;

	const imageElement = (
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
	);

	if (!zoomable) {
		return (
			<Figure
				caption={caption}
				captionPosition={captionPosition}
				alwaysWrap={alwaysWrap}
				className={figureClassName}
			>
				{imageElement}
			</Figure>
		);
	}

	return (
		<Dialog>
			<DialogTrigger
				type="button"
				className={cn(
					"inline-block relative group/zoom",
					figureClassName,
				)}
				aria-label={typeof props.alt === "string" ? `${props.alt} 확대 보기` : "이미지 확대 보기"}
			>
				<Figure
					caption={caption}
					captionPosition={captionPosition}
					alwaysWrap={alwaysWrap}
				>
					{imageElement}
				</Figure>
				<span
					className={cn(
						"pointer-events-none",
						"absolute top-2 right-2",
						"flex items-center justify-center",
						"rounded-md bg-black/60 p-1.5 text-white backdrop-blur-xs",
						"opacity-0 transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100",
					)}
				>
					<Icon icon="ZoomIn" size={14}/>
				</span>
			</DialogTrigger>

			<DialogContent
				showCloseButton={false}
				className={cn(
					"max-w-none! bg-transparent ring-0 p-0 inset-0 translate-none pointer-events-none",
					"isolate flex items-center-safe justify-center-safe",
					"**:[figcaption]:text-foreground **:[figcaption]:font-medium",
				)}
			>
				<DialogTitle className="sr-only">
					{props.alt || caption || "확대된 이미지"}
				</DialogTitle>
				<DialogDescription className="sr-only">
					이미지 확대 뷰어입니다.
					ESC를 누르거나 이미지 외부를 클릭하면 닫힙니다.
				</DialogDescription>
				<DialogClose
					render={
						<Button
							variant="ghost"
							className={cn(
								"fixed top-4 right-4 pointer-events-auto",
							)}
							size="icon-sm"
						/>
					}
				>
					<Icon icon="X"/>
					<span className="sr-only">Close</span>
				</DialogClose>
				<div className="mx-12 size-fit pointer-events-auto">
					<Figure
						caption={caption}
						captionPosition={captionPosition}
						alwaysWrap={alwaysWrap}
						className={figureClassName}
					>
						{imageElement}
					</Figure>
				</div>
			</DialogContent>
		</Dialog>
	);
}



export interface VideoProps extends React.ComponentProps<"video">, CommonFigureOptions {
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
	figureClassName,
	sourceProps,
	trackProps,
	...props
}: VideoProps) {
	sourceProps = array.to(sourceProps);
	trackProps = array.to(trackProps);

	return (
		<Figure
			caption={caption}
			captionPosition={captionPosition}
			alwaysWrap={alwaysWrap}
			className={figureClassName}
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
