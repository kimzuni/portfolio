import type * as markdown from "@/lib/markdown";

import { ContentBox, type ContentBoxProps } from "@/components/content-box";



export interface MarkdownBoxProps extends Omit<ContentBoxProps, "children" | "dangerouslySetInnerHTML"> {
	source: markdown.Result;
}

export function MarkdownBox({
	source,
	...props
}: MarkdownBoxProps) {
	return (
		<ContentBox
			dangerouslySetInnerHTML={{ __html: source.html ?? "" }}
			{...props}
		/>
	);
}
