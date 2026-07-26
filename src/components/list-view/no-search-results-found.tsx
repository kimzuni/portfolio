import { cn } from "@/lib/utils";

import { FilterResetButton, type FilterResetButtonProps } from "@/components/filter/reset-button";



export interface NoSearchResultsFoundProps extends React.ComponentProps<"div"> {
	visible?: boolean;
	message?: string;
	submessage?: string;
	resetButtonProps?: FilterResetButtonProps;
}

export function NoSearchResultsFound({
	visible = true,
	message = "검색 결과를 찾을 수 없어요",
	submessage,
	resetButtonProps,
	className,
	children,
	...props
}: NoSearchResultsFoundProps) {
	if (!visible) {
		return null;
	}

	return (
		<div className={cn("text-center text-muted-foreground space-y-4", className)} {...props}>
			<p className="empty:hidden text-lg font-medium">{message}</p>
			<p className="empty:hidden text-sm opacity-80">{submessage}</p>
			{resetButtonProps && (
				<FilterResetButton
					{...resetButtonProps}
					className={cn(
						"mx-auto mt-6",
						resetButtonProps?.className,
					)}
				/>
			)}
			{children}
		</div>
	);
}
