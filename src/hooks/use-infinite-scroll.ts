"use client";

import { useEffect, useRef, useState, useCallback } from "react";



export interface UseInfiniteScrollOptions {
	initialPageSize?: number;
	pageSize?: number;
	threshold?: number;
}

export function useInfiniteScroll<
	E extends Element = HTMLElement,
	T = unknown,
>(
	items: T[],
	{
		initialPageSize,
		pageSize = 12,
		threshold = 150,
	}: UseInfiniteScrollOptions = {},
) {
	const [visibleCount, setVisibleCount] = useState(Math.min(initialPageSize ?? pageSize, items.length));
	const ref = useRef<E | null>(null);

	const reset = () => {
		setVisibleCount(Math.min(initialPageSize ?? pageSize, items.length));
	};

	const hasMore = visibleCount < items.length;

	const loadMore = useCallback(() => {
		setVisibleCount((count) => {
			if (count >= items.length) return count;
			return Math.min(count + pageSize, items.length);
		});
	}, [items.length, pageSize]);

	useEffect(() => {
		const target = ref.current;
		if (!target || !hasMore) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					loadMore();
				}
			},
			{
				rootMargin: `0px 0px ${threshold}px 0px`,
				threshold: 0,
			},
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [hasMore, threshold, loadMore]);

	const visibleItems = items.slice(0, visibleCount);

	return {
		ref,
		visibleItems,
		visibleCount,
		hasMore,
		reset,
	};
}
