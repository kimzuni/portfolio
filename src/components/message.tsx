import { Slot, SlotProps } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";



export interface MessageProps extends SlotProps {
	asChild?: boolean;
}

export function Message({
	asChild,
	className,
	...props
}: MessageProps) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			className={cn("empty:hidden text-lg text-muted-foreground", className)}
			{...props}
		/>
	);
}
