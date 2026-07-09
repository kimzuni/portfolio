"use client";

// ref: https://github.com/shadcn-ui/ui/issues/86#issuecomment-2241817826

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";



export type Provider = "tandpfun" | "syvixor";

export interface SkillData {
	provider?: Provider;
	icon?: string;
	label: string;
}

export interface TooltipWithMobileProps extends React.ComponentProps<typeof TooltipTrigger> {
	tooltip: React.ReactNode;
}

export function TooltipWithMobile({
	tooltip,
	className,
	...props
}: TooltipWithMobileProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Tooltip open={isOpen}>
			<TooltipTrigger
				onClick={() => setIsOpen(true)}
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
				onTouchStart={() => setIsOpen(true)}
				className={cn("size-fit", className)}
				{...props}
			/>
			<TooltipContent className="font-mono flex-col">
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);
}
