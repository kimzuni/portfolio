import type { Metadata } from "next";
import type { StaticImageData } from "next/image";



export type OGImage = Exclude<Exclude<Metadata["openGraph"], null | undefined>["images"], undefined | Array<unknown>>;

export interface MetadataOptions {
	title: string;
	description: string | string[];
	cover?: StaticImageData | OGImage;
}

export function createMetadata({
	title,
	...opts
}: MetadataOptions): Metadata {
	const description = Array.isArray(opts.description)
		? opts.description.join("\n")
		: opts.description;

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
