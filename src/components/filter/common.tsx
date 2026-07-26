import { cn } from "@/lib/utils";

import { FadeHeader, FadeSection } from "@/components/fade";
import { Heading } from "@/components/heading";
import { PageBadge } from "@/components/page-badge";

import { FilterResetButton, type FilterResetButtonProps } from "./reset-button";



export interface FilterSectionProps extends React.ComponentProps<typeof FadeSection> {
}

export function FilterSection({
	className,
	...props
}: FilterSectionProps) {
	return (
		<FadeSection
			className={cn(
				"space-y-6 *:w-full *:max-w-md",
				className,
			)}
			{...props}
		/>
	);
}



export interface FilterHeaderProps extends React.ComponentProps<typeof FadeHeader> {
	resetButtonProps?: FilterResetButtonProps;
	label: string;
	children?: React.ReactNode;
}

export function FilterHeader({
	label,
	resetButtonProps,
	className,
	children,
	...props
}: FilterHeaderProps) {
	return (
		<FadeHeader {...props}>
			<div
				className={cn(
					"flex items-center justify-between mb-0",
					className,
				)}
			>
				<PageBadge
					className="mb-4"
					label={label}
				/>
				{resetButtonProps && <FilterResetButton {...resetButtonProps}/>}
			</div>

			<Heading>{children}</Heading>
		</FadeHeader>
	);
}



export interface FilterLabelProps extends React.ComponentProps<"div"> {
}

export function FilterLabel({
	className,
	...props
}: FilterLabelProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-2",
				className,
			)}
			{...props}
		/>
	);
}



export interface FilterBoxProps extends React.ComponentProps<"div"> {
	label?: string;
	edge?: React.ReactNode;
}

export function FilterBox({
	label,
	edge,
	children,
	...props
}: FilterBoxProps) {
	return (
		<div {...props}>
			{(label || edge) && (
				<div className="flex flex-wrap gap-2 items-center justify-between mb-2">
					<FilterLabel className="empty:hidden flex-1">
						{label}
					</FilterLabel>
					<div className="text-muted-foreground text-sm">{edge}</div>
				</div>
			)}
			{children}
		</div>
	);
}



export interface ItemSizeProps extends React.ComponentProps<"span"> {
	size?: number;
}

export function ItemSize({
	size,
	className,
	...props
}: ItemSizeProps) {
	if (size === undefined) {
		return null;
	}

	return (
		<span
			className={cn(
				"opacity-75 text-[.75em]",
				className,
			)}
			{...props}
		>({size})</span>
	);
}
