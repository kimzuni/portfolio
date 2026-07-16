"use client";

import { usePathname } from "next/navigation";



const TRAILING_INDEX_REGEX = /\/(index\.html)?$/;
const normalizePath = (path: string) => {
	const replaced = path.replace(TRAILING_INDEX_REGEX, "");
	return replaced || "/";
};

export interface UseNavigationOptions {
	startsWith?: boolean;
}

export function useNavigation(defaultOpts: UseNavigationOptions = {}) {
	const pathname = normalizePath(usePathname());

	const isCurrent = (
		targetPath: string,
		{
			startsWith = defaultOpts.startsWith ?? true,
		}: UseNavigationOptions = {},
	) => {
		const currPath = normalizePath(targetPath);
		if (currPath !== "/" && startsWith) {
			return pathname.startsWith(currPath);
		}
		return currPath === pathname;
	 };

	return { 
		pathname, 
		isCurrent, 
	};
}
