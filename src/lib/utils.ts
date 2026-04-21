import { cache } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => date.toLocaleDateString("ko", {
	year: "numeric",
	month: "numeric",
	day: "numeric",
});

export const compareFn = (a: string, b: string) => a
	.toLowerCase()
	.localeCompare(b.toLowerCase());



const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify);

export type MarkdownValue = string | string[];

export const markdownToHtml = cache((value: MarkdownValue) => String(
	markdownProcessor.processSync(Array.isArray(value) ? value.join("\n") : value ?? ""),
));

export const htmlStrip = cache((value: MarkdownValue) => markdownToHtml(value).replace(/<[^>]+>/g, ""));
