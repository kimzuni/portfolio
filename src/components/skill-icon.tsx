import { TooltipWithMobile } from "./tooltip-with-mobile";



export type Provider = "tandpfun" | "syvixor";

export interface SkillIconOptions {
	provider?: Provider;
	icon?: string;
	label: string;
}

export interface SkillIconProps extends SkillIconOptions, Omit<React.ComponentProps<typeof TooltipWithMobile>, "children" | "src" | "alt" | "text"> {
	perline?: number;
	alt?: string;
}

export function SkillIcon({
	icon,
	label,
	provider = "syvixor",
	perline = 5,
	...props
}: SkillIconProps) {
	const baseURL = provider === "tandpfun" ? "https://skillicons.dev" : "https://skills.syvixor.com/api";
	icon = icon ?? label.toLowerCase().replace(/[ /.]/, "");

	return (
		<TooltipWithMobile text={label} {...props}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`${baseURL}/icons?perline=${perline}&i=${icon}`}
				alt={`Skill - ${icon}`}
				aria-label={`Skill - ${icon}`}
				className="size-[48px]"
				loading="lazy"
			/>
		</TooltipWithMobile>
	);
}
