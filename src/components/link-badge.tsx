import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Link } from "./link";
import { Icon, type IconName } from "./icon";



export interface LinkBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "asChild" | "children"> {
	icon?: IconName;
	label: string;
	href?: string;
}



export function LinkBadge({
	icon = "LinkIcon",
	label,
	href,
	variant = "secondary",
	...props
}: LinkBadgeProps) {
	const children = (
		!href
			? <span>label</span>
			: (
				<Link
					href={href}
					className={cn(
						variant === "default" && "hover:bg-primary/80!",
						variant === "destructive" && "hover:bg-destructive/70!",
						variant === "secondary" && "hover:text-primary",
						variant === "ghost" && "bg-transparent!",
					)}
				>
					<Icon icon={icon}/>
					{label}
				</Link>
			)
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
