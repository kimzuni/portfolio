"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";



export function useSearchParamRouter() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateParam = (key: string, value?: string | null) => {
		const newParams = new URLSearchParams(searchParams);
		if (!value) {
			newParams.delete(key);
		} else {
			newParams.set(key, value);
		}
		let string = newParams.toString().replaceAll("%2C", ",");
		string = string ? `?${string}` : "";
		router.replace(`${pathname}${string}`, { scroll: false });
	};

	return { searchParams, updateParam };
}
