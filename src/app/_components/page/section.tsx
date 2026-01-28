import { cn } from "@/lib/utils";



export interface SectionProps extends React.ComponentProps<"section"> {
}

export function Section({
	className,
	...props
}: SectionProps) {
	return (
		<section
			className={cn(
				"py-28 space-y-12 flex flex-col justify-center-safe",
				className,
			)}
			{...props}
		/>
	);
}
