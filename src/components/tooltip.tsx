import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from "@/components/ui/hover-card";



interface HoverCardTriggerProps extends React.ComponentProps<typeof HoverCardTrigger> {
}

interface HoverCardContentProps extends React.ComponentProps<typeof HoverCardContent> {
}

export interface TooltipProps extends React.ComponentProps<typeof HoverCard> {
	side?: HoverCardContentProps["side"];
	align?: HoverCardContentProps["align"];
	alignOffset?: HoverCardContentProps["alignOffset"];
	triggerProps?: HoverCardTriggerProps;
	className?: string;
	children?: React.ReactNode;
}

export function Tooltip({
	triggerProps,
	side = "top",
	align = "center",
	alignOffset,
	children,
	...props
}: TooltipProps) {
	return (
		<HoverCard {...props}>
			<HoverCardTrigger
				delay={0}
				closeDelay={0}
				{...triggerProps}
			/>
			<HoverCardContent
				side={side}
				align={align}
				alignOffset={alignOffset}
				className="max-w-[min(90svw,550px)] w-fit py-2"
			>{children}</HoverCardContent>
		</HoverCard>
	);
}
