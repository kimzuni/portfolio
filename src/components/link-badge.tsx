import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Link } from "./link";
import { Icon, type IconName } from "./icon";



export interface LinkBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "asChild" | "children"> {
	icon?: IconName;
	label: string;
	href?: string;
	active?: boolean;
	activeIcon?: IconName;
}



export function LinkBadge({
	icon = "LinkIcon",
	label,
	href,
	active,
	activeIcon,
	onClick,
	variant = "secondary",
	...props
}: LinkBadgeProps) {
	activeIcon ??= icon;

	const Comp = href ? Link : onClick ? "button" : "span";
	const isInteractive = Comp !== "span";
	const children = (
		<Comp

			// @ts-expect-error: ts(2322)
			href={href}
			onClick={onClick}
			data-active={active}
			className={cn(
				isInteractive && "transition-all",
				isInteractive && variant === "default" && "hover:bg-primary/80! data-[active=true]:bg-primary/80!",
				isInteractive && variant === "destructive" && "hover:bg-destructive/70! data-[active=true]:bg-destructive/70!",
				isInteractive && variant === "secondary" && "hover:text-primary data-[active=true]:text-primary",
				isInteractive && variant === "ghost" && "bg-transparent!",
			)}
		>
			<Icon icon={isInteractive && active ? activeIcon : icon}/>
			{label}
		</Comp>
	);

	return (
		<Badge
			asChild
			variant={variant}
			children={children}
			{...props}
		/>
	);
}
