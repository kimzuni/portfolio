"use client";

import { cn } from "@/lib/utils";
import { useSearchParamRouter } from "@/hooks/use-search-param-router";

import { LinkButton } from "@/components/link-button";



export interface ResetButtonProps extends Omit<React.ComponentProps<typeof LinkButton>, "href"> {
	resetKeys?: string[];
}

export function ResetButton({
	resetKeys,
	onClick,
	className,
	...props
}: ResetButtonProps) {
	const { searchParams, updateParams } = useSearchParamRouter({
		engine: "next",
		mode: "replace",
	});

	const isActive = resetKeys?.some(key => searchParams.has(key)) ?? false;

	const handleClick: typeof onClick = (...args) => {
		onClick?.(...args);

		const [event] = args;
		if (event.defaultPrevented) {
			return;
		}

		if (isActive) {
			updateParams({}, {
				removeParamKeys: resetKeys,
			});
		}
	};

	return (
		<LinkButton
			variant="outline"
			size="lg"
			icon="RotateCcw"
			onClick={handleClick}
			disabled={!isActive}
			className={cn(
				"text-foreground",
				className,
			)}
			{...props}
		/>
	);
}



export interface FilterResetButtonProps extends ResetButtonProps {
}

export function FilterResetButton(props: FilterResetButtonProps) {
	return (
		<ResetButton
			label="필터 초기화"
			iconScale={1.2}
			iconRotate={-90}
			iconPosition="left"
			{...props}
		/>
	);
}



export interface FilterResetButtonProps extends ResetButtonProps {
}

export function ViewOptionsResetButton(props: FilterResetButtonProps) {
	return (
		<ResetButton
			aria-label="Reset View Options"
			title="Reset View Options"
			{...props}
		/>
	);
}
