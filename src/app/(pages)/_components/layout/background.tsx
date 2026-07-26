"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";



export interface BackgroundProps extends React.ComponentProps<"div"> {
}

export function Background({
	className,
	...props
}: BackgroundProps) {
	const pathname = usePathname();

	return (
		<div
			data-pathname={pathname}
			className={cn(
				"w-svw h-svh",
				"from-primary/15 dark:from-primary/10 via-transparent to-transparent",
				"bg-linear-to-b dark:bg-linear-to-br",
				className,
			)}
			{...props}
		/>
	);
}
