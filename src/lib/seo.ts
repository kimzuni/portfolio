import type { Metadata } from "next";



export interface MetadataOptions extends Omit<Metadata, "description"> {
	title?: Metadata["title"];
	description?: string | string[];
}

export function createMetadata({
	title,
	description,
	...opts
}: MetadataOptions): Metadata {
	description = Array.isArray(description)
		? description.join(" ")
		: description;

	return {
		title,
		description,
		...opts,
	};
}
