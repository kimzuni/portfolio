import { TooltipWithMobile } from "@/components/tooltip-with-mobile";



export type Provider = "tandpfun" | "syvixor";

export interface SkillIconOptions {
	provider?: Provider;
	icon?: string;
	label: string;
	level: string;
}

export interface SkillIconProps extends SkillIconOptions, Omit<React.ComponentProps<typeof TooltipWithMobile>, "children" | "src" | "alt" | "tooltip"> {
	perline?: number;
	alt?: string;
	width?: number;
	height?: number;
}

export function SkillIcon({
	icon,
	label,
	level,
	provider = "syvixor",
	perline = 5,
	width = 48,
	height = 48,
	...props
}: SkillIconProps) {
	let src: string;
	if (!icon?.includes("/")) {
		const baseURL = provider === "tandpfun" ? "https://skillicons.dev" : "https://skills.syvixor.com/api";
		icon = icon ?? label.toLowerCase().replace(/[ /.]/, "");
		src = `${baseURL}/icons?perline=${perline}&i=${icon}`;
	} else {
		src = icon ?? "";
	}

	return (
		<TooltipWithMobile
			tooltip={<div className="font-mono text-center">
				<p className="border-b border-primary w-full text-center">{level}</p>
				<p>{label}</p>
			</div>}
			{...props}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={src}
				alt={`Skill - ${icon}`}
				aria-label={`Skill - ${icon}`}
				width={width}
				height={height}
				loading="lazy"
				decoding="async"
			/>
		</TooltipWithMobile>
	);
}
