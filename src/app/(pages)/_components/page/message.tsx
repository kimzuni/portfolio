import { cn } from "@/lib/utils";



export interface MessageProps extends React.ComponentProps<"p"> {
}

export function Message({
	className,
	...props
}: MessageProps) {
	return (
		<p
			className={cn(
				"empty:hidden text-lg text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}
