import type { Metadata } from "next";

import * as markdown from "@/lib/markdown";



export interface MetadataOptions extends Omit<Metadata, "description"> {
	title?: Metadata["title"];
	description?: markdown.Source;
}

export function createMetadata({
	title,
	description,
	...opts
}: MetadataOptions): Metadata {
	description = markdown.getLines(description)?.join(" ");

	return {
		title,
		description,
		...opts,
	};
}
