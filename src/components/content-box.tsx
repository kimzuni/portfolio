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
		),
	};

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});

	return element;
}
