"use client";

import { useRender, mergeProps } from "@base-ui/react";

import { cn } from "@/lib/utils";



export interface ContentBoxProps extends useRender.ComponentProps<"div"> {
}

export function ContentBox({
	render,
	...props
}: ContentBoxProps) {
	const defaultProps: useRender.ElementProps<"div"> = {
		className: cn(
			"prose dark:prose-invert max-w-none",
			"prose-p:text-justify",
			"prose-a:text-primary prose-a:hover:text-primary/80",
			"prose-code:before:hidden prose-code:after:hidden prose-code:bg-muted prose-code:text-foreground prose-code:font-[length:inherit] prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5",
		),
	};

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});

	return element;
}
