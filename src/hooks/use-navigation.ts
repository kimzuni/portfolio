"use client";

import { usePathname } from "next/navigation";



const TRAILING_INDEX_REGEX = /\/(index\.html)?$/;
const normalizePath = (path: string) => path.replace(TRAILING_INDEX_REGEX, "");

export function useNavigation() {
	const pathname = normalizePath(usePathname());

	const isCurrent = (targetPath: string) => {
		return normalizePath(targetPath) === pathname;
	};

	return { 
		pathname, 
		isCurrent, 
	};
}
