import ExportedImage, { type ExportedImageProps } from "next-image-export-optimizer";

import { cn } from "@/lib/utils";



export const Image = ExportedImage;
export interface ImageProps extends ExportedImageProps {
}

export interface VideoProps extends React.ComponentProps<"video"> {
}

export function Video({
	className,
	...props
}: VideoProps) {
	return (
		<video
			className={cn("mx-auto", className)}
			loop
			autoPlay
			muted
			playsInline
			controls
			{...props}
		/>
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
