import { useRender, mergeProps } from "@base-ui/react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";



export interface SkillLevelProps extends useRender.ComponentProps<"div"> {
	color: string;
}

export function SkillLevelProvider({
	color,
	render,
	...props
}: SkillLevelProps) {
	const defaultProps: useRender.ElementProps<"div"> = {
		className: "[--level-bg:var(--level-color)]/10 [--level-text:var(--level-color)]/85 [--level-border:var(--level-color)]/40",
		style: {
			"--level-color": color,
		} as React.CSSProperties,
	};

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});

	return element;
}



export interface SkillLevelBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "children"> {
	label: string;
}

export function SkillLevelBadge({
	label,
	className,
	...props
}: SkillLevelBadgeProps) {
	return (
		<Badge
			data-slot="skill-level-badge"
			variant="ghost"
			className={cn(
				"bg-(--level-bg) border border-(--level-border) text-(--level-text) pointer-events-none",
				className,
			)}
			{...props}
		>{label}</Badge>
	);
}
