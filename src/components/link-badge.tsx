import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/link";
import { Icon, type IconName } from "@/components/icon";



export interface LinkBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "render"> {
	label?: string;
	href?: string;
	icon?: IconName;
	iconPosition?: "left" | "right";
	iconScale?: number;
	iconRotate?: number;
	iconTranslateX?: number;
	iconTranslateY?: number;
	active?: boolean;
	activeIcon?: IconName;
}



export const EXTERNAL_REGEX = /^https?:\/\//i;

export function LinkBadge({
	label,
	href,
	icon,
	iconPosition = "left",
	iconScale = 1,
	iconRotate = 0,
	iconTranslateX = 0,
	iconTranslateY = 0,
	active,
	activeIcon,
	onClick,
	variant = "secondary",
	children: _children,
	...props
}: LinkBadgeProps) {
	// null means no icon, undefined means auto-detect
	if (icon === undefined) {
		icon = href && EXTERNAL_REGEX.test(href) ? "ExternalLink" : "Link";
	}
	if (activeIcon === undefined) {
		activeIcon = icon;
	}

	const Comp = href ? Link : onClick ? "button" : "span";
	const isInteractive = Comp !== "span";
	const children = (
		<Comp
			// @ts-expect-error: ts(2322)
			href={href}
			onClick={onClick}
			data-active={active}
			className={cn(
				"group/link-badge [&>svg]:size-[1em]!",
				isInteractive && "transition-all",
				isInteractive && variant === "default" && "hover:bg-primary/80! data-[active=true]:bg-primary/80!",
				isInteractive && variant === "destructive" && "hover:bg-destructive/70! data-[active=true]:bg-destructive/70!",
				isInteractive && variant === "secondary" && "hover:text-primary data-[active=true]:text-primary",
				isInteractive && variant === "ghost" && "overflow-visible bg-transparent!",
				isInteractive && variant === "link" && "overflow-visible",
				iconPosition === "right" ? "flex-row-reverse" : "flex-row",
			)}
		>
			<Icon
				icon={isInteractive && active ? activeIcon : icon}
				className={cn(
					"group-hover/link-badge:translate-x-(--tx) group-hover/link-badge:translate-y-(--ty) group-hover/link-badge:rotate-(--rotate)",
					"group-hover/link-badge:scale-(--scale)",
					"transition-transform",
				)}
				style={{
					"--tx": `${iconTranslateX}px`,
					"--ty": `${iconTranslateY}px`,
					"--scale": iconScale,
					"--rotate": `${iconRotate}deg`,
				} as React.CSSProperties}
			/>
			<span className="empty:hidden">{label}</span>
			{_children}
		</Comp>
	);

	return (
		<Badge
			variant={variant}
			render={children}
			{...props}
		/>
	);
}
