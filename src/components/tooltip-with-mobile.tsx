"use client";

// ref: https://github.com/shadcn-ui/ui/issues/86#issuecomment-2241817826

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";



export interface TooltipWithMobileProps extends Omit<React.ComponentProps<typeof Tooltip>, "render"> {
	className?: string;
	tooltip: React.ReactNode;
	children?: React.ReactNode;
}

export function TooltipWithMobile({
	tooltip,
	className,
	open = false,
	onOpenChange,
	children,
	...props
}: TooltipWithMobileProps) {
	const [isOpen, setIsOpen] = useState(open);

	const updateIsOpen: typeof onOpenChange = (...args) => {
		const [value] = args;
		setIsOpen(value);
		onOpenChange?.(...args);
	}

	return (
		<Tooltip
			open={isOpen}
			onOpenChange={updateIsOpen}
			{...props}
		>
			<TooltipTrigger
				onClick={() => setIsOpen(true)}
				className={cn("size-fit", className)}
			>{children}</TooltipTrigger>

			<TooltipContent className="max-w-[min(90svw,550px)]">
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);
}
