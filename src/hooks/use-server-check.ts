"use client";

import { useRef, useState, useEffect, useCallback } from "react";



const DEFAULT_CHECK_TIMEOUT = 5000;

const request = (
	url: string,
	timeout: number,
) => fetch(
	url,
	{
		method: "HEAD",
		signal: AbortSignal.timeout(timeout),
	},
);



export interface UseServerCheckOption {
	autoCheck?: boolean;
	interval?: number;
	timeout?: number;
}

export function useServerCheck(
	url: string,
	{
		autoCheck = false,
		interval = 0,
		timeout = DEFAULT_CHECK_TIMEOUT,
	}: UseServerCheckOption = {},
) {
	const [ok, setOk] = useState<boolean | undefined>(undefined);
	const isPending = useRef(false);

	const updatePending = (value: boolean) => {
		isPending.current = value;
	};

	const reset = useCallback(() => {
		updatePending(false);
		setOk(undefined);
	}, []);

	const check = useCallback(async (timeout = DEFAULT_CHECK_TIMEOUT) => {
		if (isPending.current) return;

		updatePending(true);

		let ok = false;
		try {

			const response = await request(url, timeout);
			ok = response.ok;
		} catch {
			ok = false;
		} finally {
			updatePending(false);
		}
		setOk(ok);
	}, [url]);

	useEffect(() => {
		if (!autoCheck) {
			return;
		}

		check(timeout);
		const timerId = interval <= 0 ? undefined : setInterval(() => {
			check(timeout);
		}, interval);

		return () => {
			clearInterval(timerId);
			reset();
		};
	}, [autoCheck, interval, check, timeout, reset]);

	return {
		ok,
		check,
		reset,
	};
}
