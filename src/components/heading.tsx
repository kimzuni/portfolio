import { cn } from "@/lib/utils";



export interface HeadingProps extends React.ComponentProps<"h1"> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
	level = 1,
	className,
	...props
}: HeadingProps) {
	const Comp: React.ElementType = `h${level}`;

	return (
		<Comp
			className={cn("text-3xl font-bold tracking-tight", className)}
			{...props}
		/>
	);
}
