"use client";

import * as runtime from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeReact, { type Components } from "rehype-react";
 
import { cn } from "@/lib/utils";

import { LinkBadge } from "@/components/link-badge";
import { ContentBox, type ContentBoxProps } from "@/components/content-box";



const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeReact, {
		...runtime,
		components: {
			a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
				<LinkBadge
					variant="link"
					className={cn(
						"text-[length:inherit] p-0",
						className,
					)}
					{...props}
				/>
			),
		} satisfies Components,
	});



export interface MarkdownBoxProps extends Omit<ContentBoxProps, "children"> {
	source?: string | string[];
	fallback?: React.ReactNode;
}

export function MarkdownBox({
	source,
	fallback,
	...props
}: MarkdownBoxProps) {
	const [content, setContent] = useState<React.ReactNode>(null);

	const text = Array.isArray(source) ? source.join("\n") : source;
	const isEmpty = !text?.trim();

	useEffect(() => {
		if (isEmpty) return;

		processor
			.process(text)
			.then(
				(file: { result: React.ReactNode }) => setContent(file.result)
			);
	}, [isEmpty,text]);

	return (
		<ContentBox data-is-empty={isEmpty ? "" : undefined} {...props}>
			{isEmpty ? fallback : content}
		</ContentBox>
	);
}
