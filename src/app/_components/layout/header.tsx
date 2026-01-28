import { cn } from "@/lib/utils";



export interface HeaderProps extends React.ComponentProps<"header"> {
}

export function Header({
	className,
	...props
}: HeaderProps) {
	return (
		<header
			className={cn(
				"backdrop-blur-[3px] px-4 py-4 w-full",
				className,
			)}
			{...props}
		/>
	);
}
