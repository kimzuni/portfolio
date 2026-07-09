import { cn } from "@/lib/utils";



export interface ContentBoxProps extends React.ComponentProps<"div"> {
}

export function ContentBox({
	className,
	...props
}: ContentBoxProps) {
	return (
		<div
			className={cn(
				"prose dark:prose-invert max-w-none",
				className,
			)}
			{...props}
		/>
	);
}
