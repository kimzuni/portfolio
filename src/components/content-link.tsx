import { cn } from "@/lib/utils";

import { LinkBadge, type LinkBadgeProps } from "@/components/link-badge";



export interface ContentLinkProps extends Omit<LinkBadgeProps, "variant"> {
}

export function ContentLink({
	className,
	...props
}: ContentLinkProps) {
	return (
		<LinkBadge
			variant="link"
			className={cn(
				"text-[length:inherit] border-0 p-0 translate-y-0.5",
				className,
			)}
			{...props}
		/>
	);
}
