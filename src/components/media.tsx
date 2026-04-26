import ExportedImage, { type ExportedImageProps } from "next-image-export-optimizer";

import { cn } from "@/lib/utils";
import { Figure, type FigureOption } from "@/components/figure";



export interface ImageProps extends ExportedImageProps, FigureOption {
	lightSrc?: ExportedImageProps["src"];
	darkSrc?: ExportedImageProps["src"];
}

export function Image({
	caption,
	captionPosition,
	alwaysWrap,
	lightSrc,
	darkSrc,
	src,
	className,
	...props
}: ImageProps) {
	const lightImageSrc = lightSrc ?? src;
	const darkImageSrc = darkSrc ?? src;
	const hasThemeVariants = lightImageSrc !== darkImageSrc;

	return (
		<Figure
			caption={caption}
			captionPosition={captionPosition}
			alwaysWrap={alwaysWrap}
		>
			{hasThemeVariants
				? (
					<>
						<ExportedImage
							src={lightImageSrc}
							className={cn("dark:hidden", className)}
							{...props}
						/>
						<ExportedImage
							src={darkImageSrc}
							className={cn("not-dark:hidden", className)}
							{...props}
						/>
					</>
				)
				: (
					<ExportedImage
						src={src}
						className={className}
						{...props}
					/>
				)}
		</Figure>
	);
}

export interface VideoProps extends React.ComponentProps<"video">, FigureOption {
}

export function Video({
	caption,
	captionPosition,
	alwaysWrap,
	className,
	...props
}: VideoProps) {
	return (
		<Figure
			caption={caption}
			captionPosition={captionPosition}
			alwaysWrap={alwaysWrap}
		>
			<video
				className={cn("mx-auto", className)}
				loop
				autoPlay
				muted
				playsInline
				controls
				{...props}
			/>
		</Figure>
	);
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
				sizes="100vw"
				{...props as ImageProps}
			/>
		);
}
