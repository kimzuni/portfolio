import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Icon } from "./icon";



export interface PageBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "asChild" | "children"> {
	label: string;
}

export function PageBadge({
	label,
	className,
	...props
}: PageBadgeProps) {
	return (
		<Badge variant="default" className={cn("font-mono", className)} {...props}>
			<Icon icon="Circle" className="fill-background size-2!"/>
			{label}
		</Badge>
	);
}
