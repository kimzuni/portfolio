import { cn } from "@/lib/utils";
import * as array from "@/lib/array";



export interface ListViewBarProps extends React.ComponentProps<"div"> {
	prefix?: string;
	current: number | [number, number];
	total: number;
	suffix?: string;

	enableStatusText?: boolean;
	enableActions?: boolean;
}

export function ListViewBar({
	prefix,
	current,
	total,
	suffix,
	enableStatusText = true,
	enableActions = true,
	className,
	children,
	...props
}: ListViewBarProps) {
	const nums = array.to(current);
	const statusText = `${prefix} ${nums.join("~")} of ${total} ${suffix}`.trim();

	if (!enableStatusText && !enableActions) {
		return null;
	}

	return (<>
		<div
			className={cn(
				"flex flex-wrap justify-end-safe gap-x-2 gap-y-3",
				className,
			)}
			{...props}
		>
			{enableStatusText && (
				<span
					data-slot="status-text"
					className={cn(
						"flex-1 flex items-center-safe pr-2",
						"text-sm font-medium text-nowrap",
					)}
				>{statusText}</span>
			)}
			{enableActions && (
				<div
					className="flex flex-wrap-reverse gap-2 items-center-safe justify-end-safe"
				>{children}</div>
			)}
		</div>
	</>);
}
