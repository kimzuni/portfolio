"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import * as array from "@/lib/array";



export type AllowValue = MaybeArray<number | string | boolean | null | undefined>;

export type NavigationEngine = "next" | "native";
export type NavigationMode = "push" | "replace";

export interface UseSearchParamRouterOptions {
	/**
	 * @default "next"
	 */
	engine?: NavigationEngine;

	/**
	 * @default "replace"
	 */
	mode?: NavigationMode;

	/**
	 * force update
	 *
	 * - 업데이트 시 기존 값과 동일한 값이라도 강제로 업데이트됨
	 *
	 * @default false
	 */
	force?: boolean;

	/**
	 * 기존 값을 유지할지 여부. false로 설정 시 기존 값을 모두 제거함
	 *
	 * @default true
	 */
	keepParams?: boolean;
};

export interface UseSearchParamRouterUpdateOptions {
	/**
	 * keepParams가 false인 경우 제거하지 않고 유지할 key 목록
	 */
	keepParamKeys?: string[];

	/**
	 * keepParams가 true인 경우 제거할 key 목록
	 */
	removeParamKeys?: string[];

	/**
	 * replace 모드일 때 해당 key 목록 중 하나라도 값이 변경된다면 있다면 push 모드로 변경
	 */
	pushParamKeys?: string[];

	/**
	 * push 모드일 때 해당 key 목록 중 하나라도 값이 변경된다면 replace 모드로 변경
	 */
	replaceParamKeys?: string[];
};

export interface UseSearchParamRouterUpdateParamsOptions extends UseSearchParamRouterOptions, UseSearchParamRouterUpdateOptions {
};



const isSameValue = (oldValue: string[], newValue: string[]) => {
	if (oldValue.length !== newValue.length) return false;
	const sortedOld = oldValue.toSorted();
	const sortedNew = newValue.toSorted();
	return sortedOld.every((val, idx) => val === sortedNew[idx]);
};

const isSameParams = (a: URLSearchParams, b: URLSearchParams) => {
	if (a.size !== b.size) {
		return false;
	}

	const allKeys = a.keys();
	for (const key of allKeys) {
		const aValue = a.getAll(key);
		const bValue = b.getAll(key);
		if (!isSameValue(aValue, bValue)) {
			return false;
		}
	}

	return true;
}



export function useSearchParamRouter(
	defaultOpts: UseSearchParamRouterOptions = {},
) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	/**
	 * @returns 정규화 등을 거쳐 실제 적용된 옵션을 반환
	 */
	const updateParams = (
		_data: Record<string, AllowValue>,
		{
			engine = defaultOpts.engine ?? "next",
			mode = defaultOpts.mode ?? "replace",
			force = defaultOpts.force ?? false,
			keepParams = defaultOpts.keepParams ?? true,
			keepParamKeys = [],
			removeParamKeys = [],
			pushParamKeys = [],
			replaceParamKeys = [],
		}: UseSearchParamRouterUpdateParamsOptions = {},
	): Required<UseSearchParamRouterUpdateParamsOptions> => {
		const newParams = new URLSearchParams(keepParams ? searchParams : undefined);
		const data: typeof _data = {
			...Object.fromEntries(removeParamKeys.map(cur => [cur, []])),
			...Object.fromEntries(keepParamKeys.map(cur => [cur, searchParams.getAll(cur)])),
			..._data,
		};

		for (const key in data) {
			newParams.delete(key);
			const arr = array.to(data[key]);
			for (const value of arr) {
				if (
					value !== undefined
					&& value !== null
				) newParams.append(key, value.toString());
			}
		}

		const isChanged = !isSameParams(searchParams, newParams);
		if (force || isChanged) {
			const checkKeys = mode === "replace" ? pushParamKeys : replaceParamKeys
			const modeChange = checkKeys.some(key => !isSameValue(searchParams.getAll(key), newParams.getAll(key)));
			mode = !modeChange ? mode : (mode === "push" ? "replace" : "push");

			let queryString = newParams.toString();
			queryString = queryString ? `?${queryString}` : "";

			if (engine === "native") {
				history[`${mode}State`](null, "", `${pathname}${queryString}`);
			} else {
				router[mode](`${pathname}${queryString}`, { scroll: false });
			}
		}

		return {
			engine,
			mode,
			force,
			keepParams,
			keepParamKeys: [...keepParamKeys],
			removeParamKeys: [...removeParamKeys],
			pushParamKeys: [...pushParamKeys],
			replaceParamKeys: [...replaceParamKeys],
		};
	};

	return { searchParams, updateParams };
}
