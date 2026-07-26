import { cn } from "@/lib/utils";

import {
	Card,
	CardHeader,
	CardContent,
} from "@/components/ui/card";
import { FadeSection } from "@/components/fade";
import { Icon, type IconName } from "@/components/icon";
import { Dot, type DotOptions } from "@/components/dot";



export interface StatsIconProps extends Omit<React.ComponentProps<"div">, "children"> {
	icon?: IconName;
}

export function StatsIcon({
	icon,
	color,
	className,
	...props
}: StatsIconProps) {
	if (!icon) return null;

	return (
		<div
			className={cn(
				"p-2.5 rounded-lg size-fit",
				"text-(--color) bg-(--color)/10 border border-(--color)/20",
				className,
			)}
			style={{
				"--color": color || "var(--primary)",
			} as React.CSSProperties}
			{...props}
		>
			<Icon icon={icon} className="size-4"/>
		</div>
	);
}



export interface StatsLabelProps extends React.ComponentProps<"span"> {
}

export function StatsLabel({
	className,
	...props
}: StatsLabelProps) {
	return (
		<span
			className={cn(
				"text-xs font-semibold uppercase tracking-wider",
				className,
			)}
			{...props}
		/>
	);
}



export interface StatsValueProps extends React.ComponentProps<"span"> {
}

export function StatsValue({
	className,
	...props
}: StatsValueProps) {
	return (
		<span
			className={cn(
				"text-3xl font-bold font-mono tracking-tight text-foreground/90",
				className,
			)}
			{...props}
		/>
	);
}



export interface StatsItem<V extends string | number = string | number> extends DotOptions {
	icon?: IconName;
	label?: string;
	value: V;
}

export interface StatsCardProps extends Omit<React.ComponentProps<typeof Card>, "children"> {
	icon?: IconName;
	iconColor?: string;
	label: string;
	items: Array<StatsItem>;
}

export function StatsCard({
	icon,
	label,
	items: _items,
	iconColor,
	className,
	...props
}: StatsCardProps) {
	const items = _items.length ? _items : [{ value: 0 }];

	return (
		<Card
			className={cn(
				"bg-background ring-0 rounded-none",
				"group relative flex flex-col justify-between",
				className
			)}
			{...props}
		>
			<CardHeader className="flex items-center gap-2.5">
				<StatsIcon icon={icon} color={iconColor}/>
				<StatsLabel>{label}</StatsLabel>
			</CardHeader>

			<CardContent className="flex gap-2">
				{items.map(({ icon, label, value, color }, idx) => (
					<div
						key={label || idx}
						className={cn(
							"flex-1 grid items-baseline-last gap-1.5",
							"grid-cols-[auto_1fr] grid-rows-2",
						)}
					>
						<StatsValue className="row-span-full">{value}</StatsValue>
						{
							icon ? (
								<Icon
									icon={icon}
									color={color}
									size={14}
								/>
							) : (
								<Dot color={color}/>
							)
						}
						{label && (
							<span className="text-xs text-muted-foreground font-medium">
								{label}
							</span>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}



export interface StatsBoxProps extends React.ComponentProps<typeof FadeSection> {
}

export function StatsBox({
	className,
	...props
}: StatsBoxProps) {
	return (
		<FadeSection
			className={cn(
				"grid justify-between gap-px bg-border",
				"grid-cols-[repeat(auto-fit,minmax(300px,1fr))]",
				className,
			)}
			{...props}
		/>
	);
}
