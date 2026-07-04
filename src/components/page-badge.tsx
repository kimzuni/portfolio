import { cn } from "@/lib/utils";

import { Badge } from "@/components//ui/badge";
import { Icon } from "@/components/icon";



export interface PageBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "render" | "children"> {
	label: string;
}

export function PageBadge({
	label,
	className,
	...props
}: PageBadgeProps) {
	return (
		<Badge variant="default" className={cn("font-mono", className)} {...props}>
			<Icon icon="Circle" className="fill-background px-0.5"/>
			<span>{label}</span>
		</Badge>
	);
}
