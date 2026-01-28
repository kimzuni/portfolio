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
