"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { useInfiniteScroll, type UseInfiniteScrollOptions } from "@/hooks/use-infinite-scroll";

import {
	FadeSection,
	type FadeSectionProps,
	FadeArticle,
} from "@/components/fade";
import { Heading } from "@/components/heading";
import { ItemSize } from "@/components/filter";

import { NoSearchResultsFound, type NoSearchResultsFoundProps } from "./no-search-results-found";
import { ListViewBar } from "./bar";



export interface InfiniteGroupItem<T> {
	label?: React.ReactNode;
	items: T[];
}

interface InfiniteGroupItemWithTotal<T> extends InfiniteGroupItem<T> {
	total: number;
}

export interface InfiniteScrollProps<T> extends FadeSectionProps, UseInfiniteScrollOptions {
	total: number;
	items: InfiniteGroupItem<T>[] | T[];
	renderItem: (item: T, index: number) => React.ReactNode;
	enableStatusBar?: boolean;
	enableStatusText?: boolean;
	enableStatusActions?: boolean;
	notFoundProps?: Omit<NoSearchResultsFoundProps, "resetButtonProps">;
	resetButtonProps?: NoSearchResultsFoundProps["resetButtonProps"];

	children?: React.ReactNode;
}

export function InfiniteScroll<T>({
	ref: refProp,
	total,
	items: _items,
	renderItem,
	enableStatusBar = true,
	enableStatusText = true,
	enableStatusActions = true,
	notFoundProps,
	resetButtonProps,

	initialPageSize,
	pageSize,
	threshold,

	className,
	children,
	...props
}: InfiniteScrollProps<T>) {
	const groupedItems = (
		_items[0] && typeof _items[0] === "object" && "items" in _items[0]
			? _items as InfiniteGroupItem<T>[]
			: [{ items: _items as T[] }]
	);
	const items = groupedItems.map(x => x.items).flat();

	const {
		ref: sentinelRef,
		visibleItems,
		visibleCount,
		hasMore,
		reset: resetInfiniteScroll,
	} = useInfiniteScroll<HTMLDivElement, T>(items, {
		initialPageSize,
		pageSize,
		threshold,
	});

	const visibleGroupedItems = (() => {
		let remaining = visibleCount;
		const result: InfiniteGroupItemWithTotal<T>[] = [];
		for (let i = 0; i < groupedItems.length; i++) {
			const group = groupedItems[i];
			if (remaining <= 0) break;
			if (!group) continue;

			const length = group.items.length;
			const takeCount = Math.min(remaining, length);
			if (takeCount > 0) {
				result.push({
					label: group.label,
					items: group.items.slice(0, takeCount),
					total: length,
				});
				remaining -= takeCount;
			}
		}
		return result;
	})();

	useEffect(() => {
		resetInfiniteScroll();
	}, [_items, resetInfiniteScroll]);

	return (
		<FadeSection
			ref={refProp}
			className={cn(
				"space-y-6",

				// header + footer(leading-12) + main padding(pb-20) -> 아이템이 없어도 bar가 header 바로 아래에 위치하도록 높이 조절
				"min-h-[calc(100svh-var(--header-height)-var(--spacing)*32)]",
			)}
			{...props}
		>
			<ListViewBar
				className={cn(
					"sticky z-99 -mt-2 mb-4 py-2",
					"not-last:top-(--header-height) last:bottom-0",
					"backdrop-blur-[3px]",
				)}
				prefix="Showing"
				current={visibleItems.length}
				total={items.length}
				suffix={`results (total ${total})`}
				enableStatusText={enableStatusBar && enableStatusText}
				enableActions={enableStatusBar && enableStatusActions}
			>{children}</ListViewBar>

			<div className="space-y-8 *:space-y-4">
				{visibleGroupedItems.map((group, groupIdx) => (
					<FadeArticle key={groupIdx}>
						{group.label && (
							<Heading level={3} className="border-l-4 border-primary pl-3 py-1 text-xl">
								{group.label}
								<ItemSize size={group.total} className="ml-2"/>
							</Heading>
						)}
						<div
							className={cn(
								"grid grid-cols-[repeat(auto-fill,minmax(0px,330px))] gap-6 justify-center-safe",
								className,
							)}
						>
							{group.items.map(renderItem)}
						</div>
					</FadeArticle>
				))}

				<NoSearchResultsFound
					visible={!visibleItems.length}
					{...notFoundProps}
					className={cn(
						"col-span-full w-full",
						notFoundProps?.className,
					)}
					resetButtonProps={resetButtonProps}
				/>

				{hasMore && (
					<div
						ref={sentinelRef}
						className="h-px w-full pointer-events-none opacity-0"
						aria-hidden="true"
					/>
				)}
			</div>
		</FadeSection>
	);
}
