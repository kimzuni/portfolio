import { cn } from "@/lib/utils";



export interface DotOptions {
	color?: string;
}

export interface DotProps extends React.ComponentProps<"span">, DotOptions {
}

export function Dot({
	color,
	className,
	...props
}: DotProps) {
	return (
		<span
			className={cn(
				"block rounded-full size-1.5 bg-(--color)",
				className,
			)}
			style={{
				"--color": color,
			} as React.CSSProperties}
			{...props}
		/>
	);
}
