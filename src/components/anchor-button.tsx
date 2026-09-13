"use client";

import { cn } from "@/lib/utils";

import { LinkButton, type LinkButtonProps } from "@/components/link-button";



export interface AnchorButtonProps extends Omit<LinkButtonProps, "href"> {
	targetId: string;
}

export function AnchorButton({
	targetId,
	onClick,
	className,
	...props
}: AnchorButtonProps) {
	const cleanId = targetId.replace(/^#/, "");

	const handleClick: typeof onClick = (event) => {
		onClick?.(event);
		if (event.defaultPrevented) return;

		const element = document.getElementById(cleanId);
		if (!element) return;

		element.scrollIntoView({ behavior: "smooth" });
		if (!element.hasAttribute("tabIndex")) {
			element.setAttribute("tabIndex", "-1");
		}
		element.focus({ preventScroll: true });
	};

	return (
		<LinkButton
			className={cn(
				"text-sm",
				className,
			)}
			onClick={handleClick}
			{...props}
		/>
	);
}
