import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";



type BadgeProps = React.ComponentProps<typeof Badge>;



export interface TagBadgeProps extends Omit<BadgeProps, "variant" | "asChild" | "children"> {
	label: string;
}

export function TagBadge({
	label,
	className,
	...props
}: TagBadgeProps) {
	return (
		<Badge
			variant="default"
			className={cn(
				"bg-primary/10 text-primary font-mono",
				className,
			)}
			children={label}
			{...props}
		/>
	);
}



export interface SkillBadgeProps extends Omit<BadgeProps, "variant" | "asChild" | "children"> {
	label: string;
}

export function SkillBadge({
	label,
	className,
	...props
}: SkillBadgeProps) {
	return (
		<Badge
			variant="secondary"
			className={cn(
				"font-mono",
				className,
			)}
			children={label}
			{...props}
		/>
	);
}
