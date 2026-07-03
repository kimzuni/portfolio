import { cn } from "@/lib/utils";



export interface ContentBoxProps extends React.ComponentProps<"div"> {
}

export async function ContentBox({
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
