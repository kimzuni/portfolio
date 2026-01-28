import type { Metadata } from "next";
import type { StaticImageData } from "next/image";



export type OGImage = Exclude<Exclude<Metadata["openGraph"], null | undefined>["images"], undefined | Array<unknown>>;

export interface MetadataOptions {
	title: string;
	description: string;
	cover?: StaticImageData | OGImage;
}

export function createMetadata({
	title,
	description,
	...opts
}: MetadataOptions): Metadata {
	const cover = typeof opts.cover === "object" && "src" in opts.cover
		? opts.cover.src
		: opts.cover;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: cover,
		},
	};
}
