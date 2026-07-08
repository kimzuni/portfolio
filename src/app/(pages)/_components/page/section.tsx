import { cn } from "@/lib/utils";

import { FadeSection, type FadeSectionProps } from "@/components/fade";



export interface SectionProps extends FadeSectionProps {
}

export function Section({
	className,
	...props
}: SectionProps) {
	return (
		<FadeSection
			once={false}
			className={cn(
				"py-28 space-y-12 flex flex-col justify-center-safe",
				className,
			)}
			{...props}
		/>
	);
}
