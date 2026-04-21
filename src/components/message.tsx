import { cn } from "@/lib/utils";
import { MarkdownBox, MarkdownBoxProps } from "@/components/markdown-box";



export interface MessageProps extends MarkdownBoxProps {
}

export function Message({
	className,
	...props
}: MessageProps) {
	return (
		<MarkdownBox
			className={cn("empty:hidden text-lg text-muted-foreground", className)}
			{...props}
		/>
	);
}
