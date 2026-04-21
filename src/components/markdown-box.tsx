import { cn, markdownToHtml, type MarkdownValue } from "@/lib/utils";



export interface MarkdownBoxProps extends Omit<React.ComponentProps<"div">, "children"> {
	/**
	 * @warning Used for `dangerouslySetInnerHTML`.
	 */
	source: MarkdownValue;
}

export function MarkdownBox({
	source,
	className,
	...props
}: MarkdownBoxProps) {
	return (
		<div
			className={cn("markdown-box", className)}
			dangerouslySetInnerHTML={{ __html: markdownToHtml(source) }}
			{...props}
		/>
	);
}
