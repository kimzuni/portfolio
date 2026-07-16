"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";



export type NavigationType = "push" | "replace";

export interface UseSearchParamRouterOption {
	engine?: "next" | "native";

	/**
	 * force가 true인 경우에는 기존과 동일한 값일 경우 항상 replace로 동작함
	 */
	type?: NavigationType;

	/**
	 * force update
	 *
	 * - true인 경우 update 시 기존 값과 동일한 값이라도 강제로 업데이트
	 *
	 * @default false
	 */
	force?: boolean;
};

export function useSearchParamRouter(
	defaultOpts: UseSearchParamRouterOption = {},
) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateParams = (
		key: string,
		value?: string | null,
		{
			engine = defaultOpts.engine ?? "next",
			type = defaultOpts.type ?? "replace",
			force = defaultOpts.force ?? false,
		}: UseSearchParamRouterOption = {},
	) => {
		const oldValue = searchParams.get(key);
		if (oldValue === value) {
			if (!force) {
				return;
			}
			type = "replace";
		}

		const newParams = new URLSearchParams(searchParams);
		if (!value) {
			newParams.delete(key);
		} else {
			newParams.set(key, value);
		}
		let string = newParams.toString().replaceAll("%2C", ",");
		string = string ? `?${string}` : "";

		if (engine === "native") {
			history[`${type}State`](null, "", `${pathname}${string}`);
		} else {
			router[type](`${pathname}${string}`, { scroll: false });
		}
	};

	const resetParams = (
		{
			engine = defaultOpts.engine ?? "next",
			type = defaultOpts.type ?? "replace",
		}: UseSearchParamRouterOption = {},
	) => {
		if (engine === "native") {
			history[`${type}State`](null, "", pathname);
		} else {
			router[type](pathname, { scroll: false });
		}
	};

	return { searchParams, updateParams, resetParams };
}
