import { cn } from "@/lib/utils";
import { LinkBadge, type LinkBadgeProps } from "@/components/link-badge";



export interface TagBadgeProps extends Omit<LinkBadgeProps, "variant"> {
}

export function TagBadge({
	icon = null,
	className,
	...props
}: TagBadgeProps) {
	return (
		<LinkBadge
			icon={icon}
			variant="default"
			className={cn(
				"bg-primary/10 text-primary font-mono",
				(props.href || props.onClick) && "hover:text-background",
				"data-[active=true]:bg-primary/80 data-[active=true]:text-background",
				className,
			)}
			{...props}
		/>
	);
}



export interface SkillBadgeProps extends Omit<LinkBadgeProps, "variant"> {
}

export function SkillBadge({
	icon = null,
	className,
	...props
}: SkillBadgeProps) {
	return (
		<LinkBadge
			icon={icon}
			variant="secondary"
			className={cn(
				"font-mono",
				"data-[active=true]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}
